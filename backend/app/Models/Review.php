<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'reviews';

    protected $fillable = [
        'booking_id',
        'spot_id',
        'user_id',
        'title',
        'rating',
        'comment',
        'created_at',
    ];

    protected $primaryKey = 'review_id';
    
    protected $casts = [
        'rating' => 'float',
    ];

    public function parkingSpot()
    {
        return $this->belongsTo(ParkingSpot::class, 'spot_id', 'spot_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id', 'booking_id');
    }   
    public $timestamps = false; // Disable timestamps
}
