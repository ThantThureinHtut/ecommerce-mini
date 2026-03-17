<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItemVariant extends Model
{
    protected $table = 'cart_items_variant';

    public $timestamps = false;

    protected $fillable = [
        'cart_item_id',
        'value_id',
    ];

    public function cartItem()
    {
        return $this->belongsTo(CartItem::class);
    }

    public function variant()
    {
        return $this->belongsTo(Variant::class);
    }
    public function productValue()
    {
        return $this->belongsTo(ProductValue::class, 'value_id');
    }
}
