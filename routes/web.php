<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\SocialiteController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $products = Product::orderBy('id', 'desc')->get();
    return Inertia::render('WelcomeDashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'products' => $products
    ]);
})->name("welcome");

// Item Detail Page
Route::get('/item/{name?}/{id}/detail', [ItemController::class, 'detail'])->name('item.detail');
Route::post('/item/variant/' ,[ItemController::class, 'selectItem'])->name('item.variant');

// Cart Page and OrderTracking
Route::get('/cart/{id}', [CartController::class, 'index'])->name('cart.dashboard');
Route::get('/orders/{id}', [OrderController::class, 'index'])->name('order.dashboard');
Route::get('/orders/{id}/tracking', [OrderController::class, 'tracking'])->name('order.tracking');


// OAuth Login , Register
Route::get('/auth/redirect', [SocialiteController::class, 'redirect'])->name('auth.redirect');
Route::get('/auth/callback', [SocialiteController::class, 'callback'])->name('auth.callback');




// Seller Route
Route::group(['prefix' => 'seller'], function () {
    Route::get('/dashboard', [SellerController::class, 'index'])->name('seller.dashboard');
    Route::get('/add-product', [ProductController::class, 'index'])->middleware('seller')->name('add-product.dashboard');
    Route::post('/store-product', [ProductController::class, 'store'])->middleware('seller')->name('store-product');
    Route::get('/order-view', [OrderController::class, 'seller_order_index'])->middleware('seller')->name('order-view.dashboard');
});

require __DIR__ . '/auth.php';
