<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Wallets;
use App\Models\Booking;

class Transaction extends Model
{
    protected $table = 'transactions';
    protected $primaryKey = 'transaction_id';
    public $timestamps = false;

    protected $fillable = [
        'sender_wallet_id',
        'receiver_wallet_id', 
        'booking_id',
        'transaction_type',
        'deducted_amount',
        'received_amount',
        'commission_amount',
        'created_at'
    ];

    protected $casts = [
        'deducted_amount' => 'decimal:2',
        'received_amount' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'transaction_type' => 'string',
        'created_at' => 'datetime'
    ];

    public function senderWallet()
    {
        return $this->belongsTo(Wallets::class, 'sender_wallet_id');
    }

    public function receiverWallet() 
    {
        return $this->belongsTo(Wallets::class, 'receiver_wallet_id');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }
}
