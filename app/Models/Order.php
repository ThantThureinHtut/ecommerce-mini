<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'order_number',
        'order_status',
        'price',
        'qty',
        'user_id',
        'product_id',
        'shipping_address',
    ];

    public function ordervariants()
    {
        return $this->hasMany(OrderVariant::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
