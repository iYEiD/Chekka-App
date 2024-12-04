<?php

namespace App\Repositories;

use App\Models\ParkingSpot;
use App\Repositories\Interfaces\ISpotRepo;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

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
     
        if (isset($filters['vehicle_type'])) {
            $query->where('car_type', $filters['vehicle_type']);
        }

        if (isset($filters['price_range'])) {
            $query->whereBetween('price_per_hour', $filters['price_range']);
        }

        if (!empty($filters['amenities'])) {
            $amenities = $filters['amenities'];
            foreach ($amenities as $amenity) {
            // Check if the column exists in the table
            if (Schema::hasColumn('spot_amenities', $amenity)) {
                $query->where("spot_amenities.$amenity", true);
            }
            }
        }

        if (isset($filters['search_value'])) {
            $searchValue = strtolower($filters['search_value']);
            $query->where(function ($query) use ($searchValue) {
            $query->whereRaw("INSTR(LOWER(city), ?) > 0", [$searchValue])
                  ->orWhereRaw("INSTR(LOWER(address), ?) > 0", [$searchValue])
                  ->orWhereRaw("INSTR(LOWER(district), ?) > 0", [$searchValue]);
            });
        }

     
        return $query->get();   
    }



    public function filterSpotsByAvailabilityAndTime($spots, $dayOfWeek, $startTime, $endTime)
    {
        // Print the spot IDs for debugging
        error_log('Spot IDs: ' . implode(', ', $spots->pluck('spot_id')->toArray()));
        $availableSpotIds = DB::table('availability')
            ->whereIn('spot_id', $spots->pluck('spot_id')) // Filter spots from the provided list
            ->where('day', $dayOfWeek)
            ->where('start_time', '<=', $startTime)
            ->where('end_time', '>=', $endTime)
            ->pluck('spot_id'); // Return matching spot IDs

        // Log the IDs for testing
        error_log('Available Spot  [AVAILABILITY ONLY]: ' . implode(', ', $availableSpotIds->toArray()));

     
        return $spots->whereIn('spot_id', $availableSpotIds->toArray());
    }

    public function addFavorite($spotId, $userId){
        DB::table('favourites')->insert([
            'user_id' => $userId,
            'spot_id' => $spotId
        ]);
    }   

    public function removeFavorite($spotId, $userId){
        DB::table('favourites')->where('user_id', $userId)->where('spot_id', $spotId)->delete();
    }   
}
