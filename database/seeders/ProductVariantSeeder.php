<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductVariant::query()->delete();

        $products = Product::query()->with(['variants.productValues'])->get();

        foreach ($products as $product) {
            // Only some products have per-value override price/stock.
            $hasPerValueOverride = fake()->boolean(40);

            if (!$hasPerValueOverride) {
                continue;
            }

            foreach ($product->variants as $variant) {
                foreach ($variant->productValues as $value) {
                    $basePrice = (float) ($product->base_price ?? 0);
                    $price = round(max(0.01, $basePrice + fake()->numberBetween(-500, 700)), 2);
                    $stock = fake()->numberBetween(0, 50);

                    ProductVariant::query()->updateOrCreate(
                        [
                            'product_id' => $product->id,
                            'product_type_id' => $variant->product_type_id,
                            'product_value_id' => $value->id,
                        ],
                        [
                            'status' => $stock > 0 ? 'in stock' : 'out of stock',
                            'price' => $price,
                            'stock' => $stock,
                        ]
                    );
                }
            }
        }
    }
}
