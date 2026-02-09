<?php

namespace Database\Seeders;

use App\Models\Rating;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure every product (1-50) gets at least one rating
        for ($i = 1; $i <= 50; $i++) {
            Rating::create([
                'product_id' => $i,
                'user_id' => 1,
            ]);
        }
    }
}
