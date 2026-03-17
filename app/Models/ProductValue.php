<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductValue extends Model
{
    protected $fillable = [
        'id',
        'product_type_id',
        'product_id',
        'name'
    ];

    /**
     * Get the product type that this value belongs to
     * One ProductValue (e.g., 7cm) belongs to one ProductType (e.g., Size)
     */
    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    /**
     * Get the product that this value belongs to
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function productvariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    /**
     * Get all variants that use this value
     */
    public function variants()
    {
        return $this->belongsToMany(Variant::class, 'variant_product_value');
    }
    public function cartItemVariants()
    {
        return $this->hasMany(CartItemVariant::class, 'value_id');
    }
}
