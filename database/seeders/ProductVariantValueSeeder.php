<?php

namespace Database\Seeders;

use App\Models\ProductValue;
use App\Models\ProductType;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductVariantValueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define exactly 4 values for each type.
        $valuesByType = [
            'Size' => ['Small', 'Medium', 'Large', 'XL'],
            'Color' => ['Red', 'Blue', 'Black', 'White'],
            'Weight' => ['100g', '250g', '500g', '1kg'],
            'Storage' => ['64GB', '128GB', '256GB', '512GB'],
            'Material' => ['Cotton', 'Leather', 'Wood', 'Metal'],
            'Length' => ['Short', 'Medium', 'Long', '1m'],
            'Width' => ['Narrow', 'Medium', 'Wide', '30cm'],
        ];

        $typesByName = ProductType::query()->get()->keyBy('name');
        $products = Product::query()->get();

        foreach ($products as $product) {
            foreach ($valuesByType as $typeName => $values) {
                $productType = $typesByName->get($typeName);

                if (!$productType) {
                    continue;
                }

                foreach ($values as $value) {
                    ProductValue::updateOrCreate(
                        [
                            'product_type_id' => $productType->id,
                            'product_id' => $product->id,
                            'name' => $value,
                        ],
                        []
                    );
                }
            }
        }
    }
}
