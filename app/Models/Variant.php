<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    protected $fillable = [
        'id',
        'product_id',
        'product_type_id',
        // product_value_id removed - now in pivot table
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    /**
     * Get all product values for this variant
     * One variant has many product values (4 values per type)
     */
    public function productValues()
    {
        return $this->belongsToMany(ProductValue::class, 'variant_product_value');
    }
}

