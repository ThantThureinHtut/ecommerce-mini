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
        'product_id'
    ];

    public function ordervariants(){
        return $this->hasMany(OrderVariant::class);
    }
}
