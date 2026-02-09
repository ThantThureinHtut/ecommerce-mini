<?php

namespace Database\Seeders;

use App\Models\ProductType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariantTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Size',
            'Color',
            'Weight',
            'Storage',
            'Material',
            'Length',
            'Width',
        ];
        foreach ($types as $type) {
            ProductType::create([
                'name' => $type
            ]);
        }
    }
}
