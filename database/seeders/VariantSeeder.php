<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductType;
use App\Models\ProductValue;
use App\Models\Variant;
use Illuminate\Database\Seeder;

class VariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $typeIds = ProductType::query()->pluck('id');
        $productIds = Product::query()->pluck('id');

        foreach ($productIds as $productId) {
            // Every product has 1-2 variant types, but price/stock may still come from product table.
            $selectedTypeIds = $typeIds->shuffle()->take(fake()->numberBetween(1, 2));

            foreach ($selectedTypeIds as $typeId) {
                $variant = Variant::query()->updateOrCreate(
                    [
                        'product_id' => $productId,
                        'product_type_id' => $typeId,
                    ],
                    []
                );

                $valueIds = ProductValue::query()
                    ->where('product_id', $productId)
                    ->where('product_type_id', $typeId)
                    ->pluck('id');

                if ($valueIds->isEmpty()) {
                    continue;
                }

                $variant->productValues()->syncWithoutDetaching($valueIds->all());
            }
        }
    }
}
