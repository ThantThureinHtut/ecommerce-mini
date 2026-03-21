<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\CartItemVariant;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $id = Auth::user()->id;
        $cart_id = Cart::where('user_id', $id)->first();
        if ($cart_id) {
            $cartItems = CartItem::where('cart_id', $cart_id->id)->with('product:id,name,details,base_price', 'product.productimages', 'cartItemVariants.productValue.productType')->get();
            // Transform image URLs for each product in the cart items
            foreach ($cartItems as $item) {
                $item->product->productimages->transform(function ($image) {
                    $imagePath = $image->image_url;

                    if (!str_starts_with($imagePath, '/storage/') && !filter_var($imagePath, FILTER_VALIDATE_URL)) {
                        $image->image_url = Storage::url($imagePath);
                    }

                    return $image;
                });
            }
            return Inertia::render('Item/Cart/CartPage', ['items' => $cartItems , 'cart_id' => $cart_id->id]);
        }
    return Inertia::render('Item/Cart/CartPage');
    }
    public function store(Request $request)
    {
        $selectedValueIds = collect($request->variant_id ?? [])
            ->map(fn($valueId) => (int) $valueId)
            ->filter()
            ->sort()
            ->values();


        DB::transaction(function () use ($request, $selectedValueIds) {
            // Check if the user already has a cart, if not create one
            $cart = Cart::updateOrCreate([
                'user_id' => Auth::user()->id,
            ], [
                'user_id' => Auth::user()->id
            ]);

            $product = Product::where('id', $request->product_id)->with('productvariants')->first();
            if($product->productvariants->isEmpty()) {
                $existingStock = Product::find($request->product_id);
            } else {
                $existingStock = ProductVariant::where('product_id', $request->product_id)
                    ->whereIn('product_value_id', $selectedValueIds)
                    ->first();
            }


            $existingItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $request->product_id)
                ->with('cartItemVariants')
                ->get()
                // this first() is collection method, not query builder method, so it will be executed in memory after fetching the data
                // we need to use the (use ()) to pass the $selectedValueIds variable to the closure
                // cuz we can't access the $selectedValueIds variable directly in the closure without passing it as a parameter
                ->first(function ($cartItem) use ($selectedValueIds) {
                    $existingValueIds = $cartItem->cartItemVariants
                        // pluck('value_id") take only value which key name is value_id
                        ->pluck('value_id')
                        ->map(fn($valueId) => (int) $valueId)
                        ->sort()
                        ->values();

                    return $existingValueIds->all() === $selectedValueIds->all();
                });

            if ($existingItem instanceof CartItem) {
                $existingItem->increment('qty', (int) $request->qty);
                $existingStock->decrement('stock', (int) $request->qty);
                return;
            }

            // Create a new cart item for a new product + variant combination
            $item = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'qty' => $request->qty,
                'price' => (int) $request->price,
            ]);

            $existingStock->decrement('stock', (int) $request->qty);
            foreach ($selectedValueIds as $valueId) {
                CartItemVariant::create([
                    'cart_item_id' => $item->id,
                    'value_id' => $valueId,
                ]);
            }
        });

        return redirect()->route('welcome');
    }

    // TODO: Update Cart Item Quantity
    public function update(Request $request)
    {
        $validated = $request->validate([
            'item_id' => ['required', 'integer', 'exists:cart_items,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($validated) {
            $cartItem = CartItem::where('id', $validated['item_id'])
                ->with('cartItemVariants')
                ->lockForUpdate()
                ->firstOrFail();

            $oldQty = (int) $cartItem->qty;
            $newQty = (int) $validated['quantity'];
            $qtyDelta = $newQty - $oldQty;

            if ($qtyDelta === 0) {
                return;
            };

            $stockRecord = $this->resolveStockRecord($cartItem);

            if (!$stockRecord) {
                throw ValidationException::withMessages([
                    'item_id' => 'Stock record not found for this cart item.',
                ]);
            }

            if ($qtyDelta > 0) {
                if ((int) $stockRecord->stock < $qtyDelta) {
                    throw ValidationException::withMessages([
                        'quantity' => 'Not enough stock for this quantity update.',
                    ]);
                }

                $stockRecord->decrement('stock', $qtyDelta);
            } else {
                $stockRecord->increment('stock', abs($qtyDelta));
            }

            // This update the qty value of the cart Item which is show in the cart Page
            $cartItem->update([
                'qty' => $newQty,
            ]);
        });

        return back();

    }

    public function remove(Request $request)
    {
        $validated = $request->validate([
            'item_id' => ['required', 'integer', 'exists:cart_items,id'],
        ]);

        DB::transaction(function () use ($validated) {
            $cartItem = CartItem::where('id', $validated['item_id'])
                ->with('cartItemVariants')
                ->lockForUpdate()
                ->firstOrFail();

            $stockRecord = $this->resolveStockRecord($cartItem);

            // This increase stock back to the original stock value when user delete the cartItem
            if ($stockRecord) {
                $stockRecord->increment('stock', (int) $cartItem->qty);
            }

            $cartItem->delete();
        });

        return back();
    }


    // This is check for your update stock is origainal stock or variant stock.
    private function resolveStockRecord(CartItem $cartItem)
    {
        $valueIds = $cartItem->cartItemVariants
            ->pluck('value_id')
            ->map(fn($valueId) => (int) $valueId)
            ->filter()
            ->values();

        if ($valueIds->isNotEmpty()) {
            return ProductVariant::where('product_id', $cartItem->product_id)
                ->whereIn('product_value_id', $valueIds)
                ->lockForUpdate()
                ->first();
        }

        return Product::where('id', $cartItem->product_id)
            ->lockForUpdate()
            ->first();
    }
}
