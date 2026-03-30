<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Rating;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, $id)
    {
        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'review' => ['required', 'string', 'min:3', 'max:2000'],
        ]);

        $order = Order::where('id', $id)
            ->where('user_id', Auth::id())
            ->where('order_status', 'delivered')
            ->firstOrFail();

        Rating::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $order->product_id,
            ],
            [
                'value' => $validated['rating'],
            ]
        );

        Review::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $order->product_id,
            ],
            [
                'review' => $validated['review'],
            ]
        );

        return redirect()
            ->route('order.tracking', $order->id)
            ->with('success', 'Your rating and comment have been saved.');
    }
}
