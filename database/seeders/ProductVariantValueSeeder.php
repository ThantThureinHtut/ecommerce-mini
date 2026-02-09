<?php

namespace Database\Seeders;

use App\Models\ProductValue;
use App\Models\ProductType;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariantValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define exactly 4 values for each type
        $valuesByType = [
            // Size values - 4 only
            'Size' => ['Small', 'Medium', 'Large', 'XL'],

            // Color values - 4 only
            'Color' => ['Red', 'Blue', 'Black', 'White'],

            // Weight values - 4 only
            'Weight' => ['100g', '250g', '500g', '1kg'],

            // Storage values - 4 only
            'Storage' => ['64GB', '128GB', '256GB', '512GB'],

            // Material values - 4 only
            'Material' => ['Cotton', 'Leather', 'Wood', 'Metal'],

            // Length values - 4 only
            'Length' => ['Short', 'Medium', 'Long', '1m'],

            // Width values - 4 only
            'Width' => ['Narrow', 'Medium', 'Wide', '30cm'],
        ];

        // Get all products
        $products = Product::all();
        $productCount = $products->count();
        $productIndex = 0;

        // Create product values with proper relationships
        foreach ($valuesByType as $typeName => $values) {
            // Get the ProductType by name
            $productType = ProductType::where('name', $typeName)->first();

            if (!$productType) {
                continue; // Skip if type doesn't exist
            }

            // Assign one product for all 4 values of this type
            $product = $products[$productIndex % $productCount];
            $productIndex++; // Move to next product for next type

            // Create all 4 values for this type with the same product
            foreach ($values as $value) {
                ProductValue::create([
                    'product_type_id' => $productType->id,
                    'product_id' => $product->id,
                    'name' => $value
                ]);
            }
        }
    }
}
