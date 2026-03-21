<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Item/Order/OrderPage');
    }

    public function tracking(Request $request)
    {
        return Inertia::render('Item/Order/OrderTrackingPage');
    }
    public function seller_order_index()
    {
        return Inertia::render('Seller/Order/OrderViewPage');
    }
    public function store(Request $request)
    {
        $cartItems = $request->cartItems;
        $variants = $request->variant;
        $cart = Cart::find($request->cart_id);
        DB::transaction(function () use ($cartItems, $variants, $cart, $request) {
            foreach ($cartItems as $cartKey => $cartItem) {
                // $cartItem is output array so can't use the ->name
                $orderCode = "ORDER-MM-" . $cartItem['product_id'] . "-" . time();
                $order = Order::updateOrCreate([
                    "order_number" => $orderCode
                ], [
                    "order_number" => $orderCode,
                    "order_status" => "none",
                    "price" => (int) $cartItem['price'],
                    "qty" => (int) $cartItem['qty'],
                    "user_id" => Auth::user()->id,
                    "product_id" => $cartItem['product_id'],
                ]);

                // This check is variant is exit for that product or not to aviod the null or underfined error
                if (isset($variants[$cartKey])) {
                    foreach ($variants[$cartKey] as $variant) {
                        foreach ($variant as $variantKey => $variantValue) {
                            $order->ordervariants()->create([
                                'key' => $variantKey,
                                'value' => $variantValue
                            ]);
                        }
                    }
                }
            }
            if(isset($cart)){
                $cart->delete();
            }

        });

        return back();
    }
}
