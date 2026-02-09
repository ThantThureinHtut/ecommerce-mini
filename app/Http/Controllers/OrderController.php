<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index($id){
        return Inertia::render('Item/Order/OrderPage');
    }

    public function tracking($id){
        return Inertia::render('Item/Order/OrderTrackingPage');
    }
    public function seller_order_index(){
        return Inertia::render('Seller/Order/OrderViewPage');
    }
}
