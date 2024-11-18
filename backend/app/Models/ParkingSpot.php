<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParkingSpot extends Model
{
    use HasFactory;

    protected $table = 'parking_spots';

    protected $fillable = [
        'host_id',
        'longitude',
        'latitude',
        'price_per_hour',
        'car_type',
        'title',
        'main_description',
        'status',
    ];

    // Define the relationship with the User model
    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }
}