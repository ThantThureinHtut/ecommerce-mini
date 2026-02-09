<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'product_type_id',
        'product_value_id',
        'base_price',
        'stock',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function producttype()
    {
        return $this->belongsTo(ProductType::class, 'product_type_id');
    }

    public function productvalue()
    {
        return $this->belongsTo(ProductValue::class, 'product_value_id');
    }

}
