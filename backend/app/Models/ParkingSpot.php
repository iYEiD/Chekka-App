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
        'overall_rating',
    ];
    protected $primaryKey = 'spot_id';

    protected $casts = [
        'longitude' => 'float',
        'latitude' => 'float',
        'price_per_hour' => 'float',
        'overall_rating' => 'float',
    ];

    // Define the relationship with the User model
    public function host()
    {
        return $this->belongsTo(User::class, 'host_id', 'user_id');
    }

    public function isFavouriteForUser($userId)
    {
        return $this->favourites()->where('user_id', $userId)->exists();
    }

    public function favourites()
    {
        return $this->hasMany(Favourite::class, 'spot_id');
    }

    public function amenities()
    {
        return $this->hasMany(Amenity::class, 'spot_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'spot_id');
    }

    public function availability(){
        return $this->hasMany(Availability::class,'spot_id');
    }

    public function bookings(){
        return $this->hasMany(Booking::class,'spot_id');
    }

    public function location(){
        return $this->hasMany(Location::class,'spot_id');
    }   
}
