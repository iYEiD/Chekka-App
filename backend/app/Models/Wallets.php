<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallets extends Model
{
    protected $table = 'wallets';

    protected $primaryKey = 'wallet_id';

    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'balance',
        'last_updated'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
