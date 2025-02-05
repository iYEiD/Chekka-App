<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    //
    protected $table = 'spot_amenities';
    
    protected $fillable = [
        'spot_id',
        'is_covered',
        'has_security',
        'has_ev_charging',
        'is_handicap_accessible',
        'has_lightning',
        'has_cctv'
    ];
    protected $primaryKey = 'amenity_id';

    public function parkingSpot()
    {
        return $this->belongsTo(ParkingSpot::class, 'spot_id','spot_id');
    }
}
