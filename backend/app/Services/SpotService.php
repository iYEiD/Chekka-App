<?php

namespace App\Services;

use App\Services\Interfaces\ISpotService;
use App\Repositories\SpotRepo;
use App\Models\ParkingSpot;
use Illuminate\Support\Facades\Auth;
use App\Repositories\BookingRepo;

class SpotService implements ISpotService{

    protected $spotRepo;
    protected $bookingRepo;

    public function __construct(SpotRepo $spotRepo, BookingRepo $bookingRepo)
    {
        $this->spotRepo = $spotRepo;
        $this->bookingRepo = $bookingRepo;
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
        // Apply filters excluding time_range
        $filteredSpots = $this->applyFilters($request);
        // Apply time range filter
        if(isset($request->time_range)){
        $filteredSpots = $this->applyTimeRangeFilter($filteredSpots, $request->time_range);
        }   
        // Get User
        $user = Auth::user();
        // Pass filtered spots to apply favourites for the user 
        $favourites = $this->applyFavourites($filteredSpots, $user->user_id);
        // Transform/Map spots to the desired format
        $transformedSpots = $this->transformSpots($favourites);
       
        return $transformedSpots;
    }


    // FINAL MAPPER
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
                'longitude' => (float)$spot->longitude,
                'latitude' => (float)$spot->latitude,
                'price_per_hour' => (float)$spot->price_per_hour,
                'car_type' => $spot->car_type,
                'title' => $spot->title,
                'main_description' => $spot->main_description,
                'status' => $spot->status,
                'overall_rating' => (float)$spot->overall_rating,
                'location' => [
                    'city' => $spot->city,
                    'district' => $spot->district,
                    'address' => $spot->address,
                ],
                'amenities' => $amenities,
                'is_favorite' => $spot->is_favourite, //Intentionally favOrite since frontend receives o not favOUrite
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



    public function applyTimeRangeFilter($spots, $timeRange)
    {
        // Parse the input time range
        [$start, $end] = $timeRange;
    
        // Convert to Carbon instances for processing
        $startTime = \Carbon\Carbon::createFromFormat('d/m/Y:H:i', $start);
        $endTime = \Carbon\Carbon::createFromFormat('d/m/Y:H:i', $end);
        
        // Determine the day of the week
        $dayOfWeek = $startTime->dayOfWeekIso;
        
        // Debug
        error_log("Start Time: " . $startTime);
        error_log("End Time: " . $endTime);
        error_log("Day of Week: " . $dayOfWeek);

        // Filter spots by availability
        $availableSpots = $this->spotRepo->filterSpotsByAvailabilityAndTime($spots, $dayOfWeek, $startTime->format('H:i'), $endTime->format('H:i'));

        // Filter Booked Spots
        $filteredBookedSpots =$this->bookingRepo->filterBookedSpots($availableSpots, $timeRange);

        return $filteredBookedSpots;

    }

    public function updateFavoriteSpot($request){
   
        $user = Auth::user();
        $spotId = $request->route('spot_id');
        $isFavourite = $request->input('is_favorite');

        if($isFavourite){
            $this->spotRepo->addFavorite($spotId, $user->user_id);
        }else{
            $this->spotRepo->removeFavorite($spotId, $user->user_id);
        }
    }
}
