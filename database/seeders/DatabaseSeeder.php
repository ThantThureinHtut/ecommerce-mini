<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Rating;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            RoleSeeder::class,
            SellerSeeder::class,
            // ProductSeeder::class,
            // RatingSeeder::class,
            // ReviewSeeder::class,
            ProductVariantTypeSeeder::class,
            // ProductVariantValueSeeder::class,
            // VariantSeeder::class,
            // ProductVariantSeeder::class,
        ]);

    }
}
