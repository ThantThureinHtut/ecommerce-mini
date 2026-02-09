<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\Role;
use App\Models\Seller;
use App\Models\User;
use Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SellerController extends Controller
{
    public function index()
    {
        return Inertia::render("Seller/SellerDashboard");
    }

    public function register_create()
    {
        return Inertia::render("Auth/SellerAuth/Register");
    }
    public function register_store(Request $request)
    {
        $request->validate([
            "phone_number" => "required",
            "shop_name" => "required"
        ]);

        $user = Auth::user();
        // Check if user already has a seller account
        $seller_exist = Seller::where("user_id", $user->id)->exists();
        if ($seller_exist) {
            return back()->withErrors([
                'email' => 'This user has already created a seller account.',
            ]);
        }

        $seller = Seller::create([
            'user_id' => $user->id,
            "shop_name" => $request->shop_name,
            "phone_number" => $request->phone_number,
            "status" => 'pending'
        ]);

        $sellerRoleId = Role::where('name', 'seller')->value('id');
        $user->roles()->syncWithoutDetaching([$sellerRoleId]);
        event(new Registered($user));
        Auth::login($user);
        return redirect('/seller/dashboard');
    }



    // Login Auth Section
    public function login_create()
    {
        return Inertia::render("Auth/SellerAuth/Login");
    }
    /**
     * Handle an incoming authentication request.
     */

    public function login_store(Request $request): RedirectResponse
    {
        $request->validate([
            "email" => "required",
            'password' => "required"
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            if (!$user->hasRole('seller')) {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'This account is not registered as a seller.',
                ]);
            }
            $request->session()->regenerate();
            return redirect("/seller/dashboard");
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.'
        ]);
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/seller/login');

    }

}
