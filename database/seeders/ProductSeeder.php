<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 50; $i++) {
            Product::create([
                'name' => fake()->name(),
                'details' => fake()->paragraph(),
                'seller_id' => 1,
                'base_price' => "3000.00",
                'stock' => 100,
            ]);
        }
    }
}
