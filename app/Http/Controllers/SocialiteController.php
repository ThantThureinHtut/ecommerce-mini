<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    /**
     * Redirect the user to Google's OAuth page.
     */
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback from Google OAuth.
     */
    public function callback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Find existing user or create a new one
            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'password' => null, // Random password for OAuth users
                    'email_verified_at' => now(), // Google emails are verified
                ]
            );
            $userRoleId = Role::where('name', 'user')->value('id');
            $user->roles()->syncWithoutDetaching([$userRoleId]);
            // Log the user in with "remember me" enabled
            Auth::login($user, remember: true);

            // Redirect to the welcome/dashboard page
            return redirect()->route('welcome');

        } catch (\Exception $e) {
            // If OAuth fails, redirect back to login with an error
            return redirect()->route('login')->withErrors([
                'oauth' => 'Unable to authenticate with Google. Please try again.',
            ]);
        }
    }
}
