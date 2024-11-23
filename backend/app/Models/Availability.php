<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    //
protected $table = 'availability';

protected $primaryKey = 'availability_id';

protected $fillable = [
    'spot_id',
    'start_time',
    'end_time',
    'day'
];

public function parkingSpot()
{
    return $this->belongsTo(ParkingSpot::class, 'spot_id', 'spot_id');
}

}
