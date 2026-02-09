<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Seller extends Model
{
    protected $fillable = [
        'user_id',
        'shop_name',
        'phone_number',
        'status'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
