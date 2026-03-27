<?php

namespace App\Http\Controllers;

use App\Mail\OrderPlacedMail;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Shapping_Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
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

        $address = Shapping_Address::where('user_id', Auth::id())->first();

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
            'address' => $address,
        ]);
    }

    public function address()
    {
        $address = Shapping_Address::firstOrNew(
            ['user_id' => Auth::id()],
            ['address' => '']
        );

        return Inertia::render('Item/Order/AddressPage', [
            'address' => $address,
        ]);
    }

    public function updateAddress(Request $request)
    {
        $validated = $request->validate([
            'address' => ['required', 'string', 'max:5000'],
        ]);

        Shapping_Address::updateOrCreate(
            ['user_id' => Auth::id()],
            ['address' => $validated['address']]
        );

        return redirect()
            ->route('order.dashboard')
            ->with('success', 'Shipping address updated successfully.');
    }

    public function tracking(Request $request)
    {
        return Inertia::render('Item/Order/OrderTrackingPage');
    }

    public function seller_order_index()
    {
        $sellerId = Auth::user()?->seller?->id;

        $orders = Order::select('orders.order_number', 'orders.user_id', 'users.name as name', 'users.email as email')
            ->join('users', 'users.id', '=', 'orders.user_id')
            ->selectRaw('MAX(orders.created_at) as latest_created_at')
            ->selectRaw('COUNT(*) as item_count')
            ->selectRaw('SUM(orders.price * orders.qty) as total_amount')
            ->whereHas('product', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->groupBy('orders.order_number', 'orders.user_id', 'users.name', 'users.email')
            ->orderByDesc('latest_created_at')
            ->paginate(10);

        $orders_status = Order::select('order_status')->get();
        logger($orders->toArray());
        return Inertia::render('Seller/Order/OrderViewPage', [
            'orders' => $orders,
            'status' => $orders_status
        ]);
    }
    public function seller_order_detail($order_number)
    {
        logger($order_number);
        $sellerId = Auth::user()?->seller?->id;
        $orders = Order::where('order_number', $order_number)->with(['user', 'product.productimages', 'ordervariants'])
            ->whereHas('product', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->get();

        foreach ($orders as $order) {
            $order->product?->productimages?->transform(function ($image) {
                $imagePath = $image->image_url;
                if (!str_starts_with($imagePath, '/storage/') && !filter_var($imagePath, FILTER_VALIDATE_URL)) {
                    $image->image_url = Storage::url($imagePath);
                }
                return $image;
            });
        }



        return Inertia::render('Seller/Order/OrderDetailPage', ['orders' => $orders]);
    }

    public function seller_tracking($id)
    {
        $sellerId = Auth::user()?->seller?->id;

        $order = Order::with(['user', 'product.productimages', 'ordervariants'])
            ->where('id', $id)
            ->whereHas('product', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->firstOrFail();

        $order->product?->productimages?->transform(function ($image) {
            $imagePath = $image->image_url;

            if (!str_starts_with($imagePath, '/storage/') && !filter_var($imagePath, FILTER_VALIDATE_URL)) {
                $image->image_url = Storage::url($imagePath);
            }

            return $image;
        });

        return Inertia::render('Seller/Order/OrderTrackingUpdatePage', [
            'order' => $order,
            'availableStatuses' => [
                'pending',
                'processing',
                'shipped',
                'delivered',
                'cancelled',
            ],
        ]);
    }

    public function update_seller_tracking(Request $request, $id)
    {
        $validated = $request->validate([
            'order_status' => ['required', 'string', 'in:pending,processing,shipped,delivered,cancelled'],
        ]);

        $sellerId = Auth::user()?->seller?->id;

        $order = Order::where('id', $id)
            ->whereHas('product', function ($query) use ($sellerId) {
                $query->where('seller_id', $sellerId);
            })
            ->firstOrFail();

        $order->update([
            'order_status' => $validated['order_status'],
        ]);

        return redirect()
            ->route('order-view-detail.dashboard', $order->id)
            ->with('success', 'Order tracking status updated successfully.');
    }

    public function store(Request $request)
    {
        $cartItems = $request->cartItems;
        $variants = $request->variant;
        $cart = Cart::find($request->cart_id);
        $timezone = $request->string('browser_timezone')->toString();
        DB::transaction(function () use ($cartItems, $variants, $cart, $timezone) {
            $orderCode = "ORDER-MM" . "-" . time();
            foreach ($cartItems as $cartKey => $cartItem) {
                // $cartItem is output array so can't use the ->name
                $order = Order::create([
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
            $orders = Order::where('order_number', $orderCode)->get();
            if (isset($orders)) {
                Mail::to(Auth::user()->email)->queue(new OrderPlacedMail($orders, $timezone));
            }
        });


        return back();
    }

    public function print_invoice($id)
    {
        $order = Order::where('id', $id)->first();
        return view('mail.print-order-mail', compact('order'));
    }
}
