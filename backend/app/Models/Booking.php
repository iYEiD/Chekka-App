<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model

{
    protected $table = 'bookings';
    protected $primaryKey = 'booking_id';

    protected $fillable = [
        'user_id',
        'spot_id',
        'start_time',
        'end_time',
        'status',
        'total_price',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function parkingSpot()
    {
        return $this->belongsTo(ParkingSpot::class, 'spot_id', 'spot_id');
    }
    
}
