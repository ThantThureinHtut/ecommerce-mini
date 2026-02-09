<?php

namespace Database\Seeders;

use App\Models\Seller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the roles
        $userRole = Role::where('name', 'user')->first();
        $sellerRole = Role::where('name', 'seller')->first();

        // Create a test user first
        $user = User::create([
            'name' => 'Test Seller',
            'email' => 'seller@example.com',
            'password' => Hash::make('password'),
        ]);

        // Attach user role (default role for all users)
        $user->roles()->attach($userRole->id);

        // Attach seller role (additional role for sellers)
        $user->roles()->attach($sellerRole->id);

        // Create seller account
        Seller::create([
            'user_id' => $user->id,
            'shop_name' => 'Test Store',
            'phone_number' => '+1234567890',
            'status' => 'approved',
        ]);
    }
}
