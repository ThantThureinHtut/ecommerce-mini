<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('variant_product_value', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variant_id')->constrained('variants')->cascadeOnDelete();
            $table->foreignId('product_value_id')->constrained('product_values')->cascadeOnDelete();
            $table->unique(['variant_id', 'product_value_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variant_product_value');
    }
};
