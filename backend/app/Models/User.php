<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'status',
        'email',
        'password',
        'google_id',
        'is_valid',
    ];
    protected $primaryKey = 'user_id';
    protected $table = 'users';

    public function favourites()
    {
        return $this->hasMany(Favourite::class, 'user_id');
    }   

    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id');
    }

    public function spotsOwned()
    {
        return $this->hasMany(ParkingSpot::class, 'host_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'guest_id');
    }

    public function wallet()
    {
        return $this->hasOne(Wallets::class, 'user_id');
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
