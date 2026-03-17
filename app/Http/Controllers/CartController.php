<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\CartItemVariant;
// use App\Models\Product;
// use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
                    $image->image_url = Storage::url($image->image_url);
                    return $image;
                });
            }
            return Inertia::render('Item/Cart/CartPage', ['items' => $cartItems]);
        }
        return Inertia::render('Item/Cart/CartPage');
    }
    public function store(Request $request)
    {

        // Check if the user already has a cart, if not create one
        $cart = Cart::updateOrCreate([
            'user_id' => Auth::user()->id,
        ], [
            'user_id' => Auth::user()->id
        ]);

        // Create a new cart item for the product being added to the cart
        $items = CartItem::create(
            [
                'cart_id' => $cart->id,
                'product_id' => $request->product_id,
                'qty' => $request->qty,
                'price' => (int)$request->price,
            ]
        );

        // Associate the selected product variants with the cart item
        $values = array_values($request->variant_id);
        foreach ($values as $value_id) {
            CartItemVariant::updateOrCreate(
                [
                    'cart_item_id' => $items->id,
                    'value_id' => $value_id,
                ],
                [
                    'cart_item_id' => $items->id,
                    'value_id' => $value_id,
                ]
            );
        }
        return redirect()->route('welcome');
    }

    // TODO: Update Cart Item Quantity
    public function update(Request $request)
    {
        logger($request->toArray());
        // $product_stock = Product::where('id' , $request->product_id)->value('stock');
        // $product_variant_is = ProductVariant::where('product_id', $request->product_id);
        // $final_price = (int)$product_variant_is->first()->price * (int)$request->quantity;
        CartItem::where('id', $request->item_id)->update([
            'qty' => $request->quantity,
            // 'price' => $final_price
        ]);

    }

    public function remove(Request $request)
    {
        CartItem::where('id', $request->item_id)->delete();
        return back();
    }
}
