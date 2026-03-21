<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderVariant extends Model
{
    protected $fillable = [
        'order_id',
        'key',
        'value'
    ];

    public function order() {
        return $this->belongsTo(Order::class);
    }
}
