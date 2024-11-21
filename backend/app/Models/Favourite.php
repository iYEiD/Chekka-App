<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    protected $table = 'favourites';

    protected $fillable = [
        'spot_id',
        'user_id',
    ];
    protected $primaryKey = 'favourite_id';
}