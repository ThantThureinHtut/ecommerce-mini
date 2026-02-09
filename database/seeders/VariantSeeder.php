<?php

namespace Database\Seeders;

use App\Models\Variant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Map product type IDs to their corresponding product value ID ranges
        // Based on ProductVariantTypeSeeder and ProductVariantValueSeeder order
        // Each type now has exactly 4 values (updated seeder)
        $typeValueRanges = [
            1 => ['start' => 1, 'end' => 4],    // Size: values 1-4 (Small, Medium, Large, XL)
            2 => ['start' => 5, 'end' => 8],    // Color: values 5-8 (Red, Blue, Black, White)
            3 => ['start' => 9, 'end' => 12],   // Weight: values 9-12 (100g, 250g, 500g, 1kg)
            4 => ['start' => 13, 'end' => 16],  // Storage: values 13-16 (64GB, 128GB, 256GB, 512GB)
            5 => ['start' => 17, 'end' => 20],  // Material: values 17-20 (Cotton, Leather, Wood, Metal)
            6 => ['start' => 21, 'end' => 24],  // Length: values 21-24 (Short, Medium, Long, 1m)
            7 => ['start' => 25, 'end' => 28],  // Width: values 25-28 (Narrow, Medium, Wide, 30cm)
        ];

        // Create variants for each product
        for ($productId = 1; $productId <= 50; $productId++) {
            // Generate 1-2 random variant types per product
            $variantCount = rand(1, 2);
            $usedTypes = [];

            for ($i = 0; $i < $variantCount; $i++) {
                // Pick a random type (1-7) that hasn't been used for this product
                $typeId = rand(1, 7);

                if (in_array($typeId, $usedTypes)) {
                    $i--;
                    continue;
                }

                $usedTypes[] = $typeId;

                // Create variant with product and type (no product_value_id)
                $variant = Variant::create([
                    'product_id' => $productId,
                    'product_type_id' => $typeId,
                ]);

                // Attach all 4 values for this type to the variant
                $range = $typeValueRanges[$typeId];
                $valueIds = range($range['start'], $range['end']); // All 4 values
                $variant->productValues()->attach($valueIds);
            }
        }
    }
}
