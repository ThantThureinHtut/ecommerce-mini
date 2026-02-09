<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    protected $fillable = [
        'id',
        'name'
    ];

    /**
     * Get all product values for this type
     * One ProductType (e.g., Size) has many ProductValues (e.g., 7cm, 8cm)
     */
    public function productValues()
    {
        return $this->hasMany(ProductValue::class);
    }

    public function productvariant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
