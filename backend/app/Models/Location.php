<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    protected $primaryKey = 'location_id';
    protected $table = 'spot_locations';

    protected $fillable = [
        'spot_id',
        'address',
        'city',
        'district'
    ];

    public function parkingSpot()
    {
        return $this->belongsTo(ParkingSpot::class, 'spot_id', 'spot_id');
    }   

}
