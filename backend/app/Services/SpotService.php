<?php

namespace App\Services;

use App\Services\Interfaces\ISpotService;
use App\Repositories\SpotRepo;
use App\Models\ParkingSpot;
use Illuminate\Support\Facades\Auth;

class SpotService implements ISpotService{

    protected $spotRepo;

    public function __construct(SpotRepo $spotRepo)
    {
        $this->spotRepo = $spotRepo;
    }

    public function fetchParkingSpots($request){
        $spots = $this->spotRepo->getAllSpots();
        return $spots;
    }

    public function applyFilters($request){
        $filters = $request->all();
        $filteredSpots = $this->spotRepo->applyFilters($filters);
        return $filteredSpots;
    }   

    public function fetchParkingSpotsFiltered($request){
        // Apply filters
        $filteredSpots = $this->applyFilters($request);
        // Get User
        $user = Auth::user();
        // Pass filtered spots to apply favourites for the user 
        $favourites = $this->applyFavourites($filteredSpots, $user->user_id);
        // Transform/Map spots to the desired format
        $transformedSpots = $this->transformSpots($favourites);
       
        return $transformedSpots;
    }
    public function transformSpots($spots)
    {
    
        $transformedSpots = $spots->map(function ($spot) {
        $amenities = [];

        // Check each amenity and add it to the array if it's true
        // ONLY RETURN POSITIVE AMENITIES VALUE
        if ($spot->is_covered) {
            $amenities[] = 'is_covered';
        }
        if ($spot->has_security) {
            $amenities[] = 'has_security';
        }
        if ($spot->has_ev_charging) {
            $amenities[] = 'has_ev_charging';
        }
        if ($spot->is_handicap_accessible) {
            $amenities[] = 'is_handicap_accessible';
        }
        if ($spot->has_lighting) {
            $amenities[] = 'has_lighting';
        }
        if ($spot->has_cctv) {
            $amenities[] = 'has_cctv';
        }
            return [
                'spot_id' => $spot->spot_id,
                'host_id' => $spot->host_id,
                'longitude' => $spot->longitude,
                'latitude' => $spot->latitude,
                'price_per_hour' => $spot->price_per_hour,
                'car_type' => $spot->car_type,
                'title' => $spot->title,
                'main_description' => $spot->main_description,
                'status' => $spot->status,
                'created_at' => $spot->created_at,
                'updated_at' => $spot->updated_at,
                'overall_rating' => $spot->overall_rating,
                'location' => [
                    'city' => $spot->city,
                    'district' => $spot->district,
                    'address' => $spot->address,
                ],
                'amenities' => $amenities,
                'is_favourite' => $spot->is_favourite,
            ];
        });
    
        return $transformedSpots;
    }

    public function applyFavourites($spots, $userId)
    {
        return $spots->map(function ($spot) use ($userId) {
            $spot->is_favourite = $spot->isFavouriteForUser($userId);
            return $spot;
        });
    }

}
