<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seller_Payment_Method extends Model
{
   
    protected $fillable = [
        'payout_type_id',
        'seller_id',
        'account_name',
    ];
}
