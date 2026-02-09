<?php

namespace Database\Seeders;

use App\Models\ProductVariant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure every product (1-50) gets at least one variant
        for ($i = 1; $i <= 50; $i++) {
            ProductVariant::create([
                'product_id' => $i,
                'product_type_id' => rand(1, 7), // ProductVariantTypeSeeder creates 7 types
                'product_value_id' => rand(1, 28), // ProductVariantValueSeeder creates 28 values (7 types × 4 values)
                'price' => fake()->randomNumber(3, true),
                'stock' => rand(1, 50)
            ]);
        }
    }
}
