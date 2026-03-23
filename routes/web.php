<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\SocialiteController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    $products = Product::with('productimages')->orderBy('id', 'desc')->get();
    // Transform image URLs for each product
    // transform() only modifies the collection in place, so we don't need to assign it back to $products
    foreach ($products as $product) {
        $product->productimages->transform(function ($image) {
            $image->image_url = Storage::url($image->image_url);
            return $image;
        });
    }

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
Route::post('/item/variant/', [ItemController::class, 'selectItem'])->name('item.variant');

// Cart Page and OrderTracking
Route::group(['prefix' => 'cart'], function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.dashboard');
    Route::post('/store', [CartController::class, 'store'])->name('cart.store');
    Route::post('/update', [CartController::class, 'update'])->name('cart.update');
    Route::post('/remove', [CartController::class, 'remove'])->name('cart.remove');
});

Route::group(['prefix' => 'order'], function () {
    Route::get('/', [OrderController::class, 'index'])->name('order.dashboard');
    Route::get('/{id}/tracking', [OrderController::class, 'tracking'])->name('order.tracking');
    Route::post('/store' , [OrderController::class , 'store'])->name('order.store');
});



// OAuth Login , Register
Route::get('/auth/redirect', [SocialiteController::class, 'redirect'])->name('auth.redirect');
Route::get('/auth/callback', [SocialiteController::class, 'callback'])->name('auth.callback');




// Seller Route
Route::group(['prefix' => 'seller'], function () {
    Route::get('/dashboard', [SellerController::class, 'index'])->name('seller.dashboard');
    Route::get('/add-product', [ProductController::class, 'index'])->middleware('seller')->name('add-product.dashboard');
    Route::post('/store-product', [ProductController::class, 'store'])->middleware('seller')->name('store-product');
    Route::get('/order-view', [OrderController::class, 'seller_order_index'])->middleware('seller')->name('order-view.dashboard');
    Route::get('/order-view-detail/{id}' , [OrderController::class,'seller_order_detail'])->middleware('seller')->name('order-view-detail.dashboard');
});

require __DIR__ . '/auth.php';
