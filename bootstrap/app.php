<?php

use App\Http\Middleware\SellerAuth;
use App\Http\Middleware\SellerGuard;
use App\Http\Middleware\UserGuard;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias(([
            'seller' => SellerAuth::class,
            'user-guard' => UserGuard::class,
            'seller-guard' => SellerGuard::class
        ]));

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
