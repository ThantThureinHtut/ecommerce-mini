<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure every product (1-50) gets at least one review
        for ($i = 1; $i <= 50; $i++) {
            Review::create([
                'user_id' => 1,
                'product_id' => $i,
                'review' => fake()->paragraph()
            ]);
        }
    }
}
