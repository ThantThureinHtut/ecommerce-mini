<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Number;

class Product extends Model
{
    protected $fillable = [
        'name',
        'base_price',
        'stock',
        'details',
        'seller_id',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'stock' => 'integer',
    ];
    protected $appends = [
        'ratings_count',
        'reviews_count',

    ];

    protected function ratingsCount(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->ratings()->count() ?? 0
        );
    }
    protected function reviewsCount(): Attribute
    {
        return Attribute::make(
            get: fn() => Number::abbreviate($this->reviews()->count() ?? 0)
        );
    }

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function productvariants()
    {
        return $this->hasMany(ProductVariant::class);
    }
    public function variants()
    {
        return $this->hasMany(Variant::class);
    }

    public function productimages()
    {
        return $this->hasMany(ProductImage::class);
    }
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
