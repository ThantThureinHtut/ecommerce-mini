<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['product.productimages', 'ordervariants'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        if (isset($orders)) {
            foreach ($orders as $order) {
                $order->product->productimages->transform(function ($image) {
                    $imagePath = $image->image_url;
                    if (!str_starts_with($imagePath, '/storage/') && !filter_var($imagePath, FILTER_VALIDATE_URL)) {
                        $image->image_url = Storage::url($imagePath);
                    }
                    return $image;
                });
            }
        }
        return Inertia::render('Item/Order/OrderPage', [
            'orders' => $orders,
        ]);
    }

    public function tracking(Request $request)
    {
        return Inertia::render('Item/Order/OrderTrackingPage');
    }
    public function seller_order_index()
    {
        $sellerId = Auth::user()?->seller?->id;

        $orders = Order::with(['user', 'product.productimages', 'ordervariants'])
            ->whereHas('product', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        foreach ($orders as $order) {
            $order->product?->productimages?->transform(function ($image) {
                $imagePath = $image->image_url;
                if (!str_starts_with($imagePath, '/storage/') && !filter_var($imagePath, FILTER_VALIDATE_URL)) {
                    $image->image_url = Storage::url($imagePath);
                }
                return $image;
            });
        }

        return Inertia::render('Seller/Order/OrderViewPage', [
            'orders' => $orders,
        ]);
    }
    public function seller_order_detail($id)
    {

        $sellerId = Auth::user()?->seller?->id;

        $order = Order::with(['user', 'product.productimages', 'ordervariants'])
            ->where('id', $id)
            ->whereHas('product', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->orderBy('created_at', 'desc')
            ->first();


        $order->product?->productimages?->transform(function ($image) {
            $imagePath = $image->image_url;
            if (!str_starts_with($imagePath, '/storage/') && !filter_var($imagePath, FILTER_VALIDATE_URL)) {
                $image->image_url = Storage::url($imagePath);
            }
            return $image;
        });


        return Inertia::render('Seller/Order/OrderDetailPage', ['order' => $order]);
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
            if (isset($cart)) {
                $cart->delete();
            }
        });

        return back();
    }
}
