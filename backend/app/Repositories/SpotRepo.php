<?php

namespace App\Repositories;

use App\Models\ParkingSpot;
use App\Repositories\Interfaces\ISpotRepo;
use Illuminate\Support\Facades\Schema;

class SpotRepo implements ISpotRepo
{
    public function getAllSpots()
    {
        return ParkingSpot::all();

    }

    public function getSpotById($spotId)
    {
        return ParkingSpot::find($spotId);
    }

    public function applyFilters($filters)
    {
        $query = ParkingSpot::query()
            ->join('spot_locations', 'parking_spots.spot_id', '=', 'spot_locations.spot_id')
            ->join('spot_amenities', 'parking_spots.spot_id', '=', 'spot_amenities.spot_id')
            ->select('parking_spots.*', 'spot_locations.city', 'spot_locations.address', 'spot_locations.district', 'spot_amenities.*');
        //possible filters: vehicle_type, price_range, search_value,amenities[], time_range[]   
     
        
        if(isset($filters['vehicle_type'])){
            $query->where('car_type', $filters['vehicle_type']);
            }
       
        if(isset($filters['price_range'])){
            $query->whereBetween('price_per_hour', $filters['price_range']);
        }
        
        if (isset($filters['amenities'])) {
            $amenities = explode(',', $filters['amenities']);
            foreach ($amenities as $amenity) {
                // Check if the column exists in the table
                if (Schema::hasColumn('spot_amenities', $amenity)) {
                    $query->where("spot_amenities.$amenity", true);
                }
            }
        }
       
        if(isset($filters['search_value'])){
            $searchValue = strtolower($filters['search_value']);
            $query->whereRaw("INSTR(LOWER(city), ?) > 0", [$searchValue])
                  ->orWhereRaw("INSTR(LOWER(address), ?) > 0", [$searchValue])
                  ->orWhereRaw("INSTR(LOWER(district), ?) > 0", [$searchValue]);
        }

         // TIME RANGE TO BE ADDED
        return $query->get();   
    }



}
