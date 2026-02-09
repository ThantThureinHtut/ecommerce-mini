<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment_Method_Value extends Model
{
    protected $fillable = [
        'user_id',
        'payment_id',
        'number',
    ];
}
