<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shapping_Address extends Model
{

    protected $fillable = [
        'user_id',
        'address',
    ];
}
