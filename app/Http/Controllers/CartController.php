<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\CartItemVariant;
// use App\Models\Product;
// use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
            return Inertia::render('Item/Cart/CartPage', ['items' => $cartItems]);
        }
        return Inertia::render('Item/Cart/CartPage');
    }
    public function store(Request $request)
    {
        $selectedValueIds = collect($request->variant_id ?? [])
            ->map(fn ($valueId) => (int) $valueId)
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

            $existingItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $request->product_id)
                ->with('cartItemVariants')
                ->get()
                // this first() is collection method, not query builder method, so it will be executed in memory after fetching the data
                // we need to use the (use ()) to pass the $selectedValueIds variable to the closure
                // cuz we can't access the $selectedValueIds variable directly in the closure without passing it as a parameter
                ->first(function ($cartItem) use ($selectedValueIds) {
                    $existingValueIds = $cartItem->cartItemVariants
                        ->pluck('value_id')
                        ->map(fn ($valueId) => (int) $valueId)
                        ->sort()
                        ->values();

                    return $existingValueIds->all() === $selectedValueIds->all();
                });

            if ($existingItem) {
                $existingItem->increment('qty', (int) $request->qty);
                return;
            }

            // Create a new cart item for a new product + variant combination
            $item = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'qty' => $request->qty,
                'price' => (int) $request->price,
            ]);

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
        CartItem::where('id', $request->item_id)->update([
            'qty' => $request->quantity,
        ]);

    }

    public function remove(Request $request)
    {
        CartItem::where('id', $request->item_id)->delete();
        return back();
    }
}
