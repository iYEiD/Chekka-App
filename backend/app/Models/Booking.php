<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model

{
    protected $table = 'bookings';
    protected $primaryKey = 'booking_id';

    protected $fillable = [
        'guest_id',
        'spot_id',
        'start_time',
        'end_time',
        'status',
        'total_price',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'guest_id', 'user_id');
    }

    public function parkingSpot()
    {
        return $this->belongsTo(ParkingSpot::class, 'spot_id', 'spot_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'booking_id', 'booking_id');
    }   
    
    public $timestamps = false; // Disable timestamps
}
