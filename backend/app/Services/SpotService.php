<?php

namespace App\Services;

use App\Services\Interfaces\ISpotService;
use App\Repositories\SpotRepo;
use App\Models\ParkingSpot;
use App\Models\Booking;
use Illuminate\Support\Facades\Auth;
use App\Repositories\BookingRepo;
use App\Models\Review;
use Carbon\Carbon;
use App\Models\Wallets;
class SpotService implements ISpotService
{

    protected $spotRepo;
    protected $bookingRepo;

    public function __construct(SpotRepo $spotRepo, BookingRepo $bookingRepo)
    {
        $this->spotRepo = $spotRepo;
        $this->bookingRepo = $bookingRepo;
    }

    public function fetchParkingSpots($request)
    {
        $spots = $this->spotRepo->getAllSpots();
        return $spots;
    }

    public function applyFilters($request)
    {
        $filters = $request->all();
        $filteredSpots = $this->spotRepo->applyFilters($filters);
        return $filteredSpots;
    }

    public function fetchParkingSpotsFiltered($request)
    {
        // Apply filters excluding time_range
        $filteredSpots = $this->applyFilters($request);
        // Apply time range filter
        if (isset($request->time_range)) {
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
                'longitude' => $spot->longitude,
                'latitude' => $spot->latitude,
                'price_per_hour' => $spot->price_per_hour,
                'car_type' => $spot->car_type,
                'title' => $spot->title,
                'main_description' => $spot->main_description,
                'status' => $spot->status,
                'overall_rating' => $spot->overall_rating,
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
        $filteredBookedSpots = $this->bookingRepo->filterBookedSpots($availableSpots, $timeRange);

        return $filteredBookedSpots;
    }

    public function updateFavoriteSpot($request)
    {

        $user = Auth::user();
        $spotId = $request->route('spot_id');
        $isFavourite = $request->input('is_favorite');

        if ($isFavourite) {
            $this->spotRepo->addFavorite($spotId, $user->user_id);
        } else {
            $this->spotRepo->removeFavorite($spotId, $user->user_id);
        }
    }

    public function fetchParkingSpotDetails($request)
    {
        $spotId = $request->route('spot_id');
        $spot = $this->spotRepo->getSpotById($spotId);

        // Append Host Details
        $host = $spot->host()->select('user_id', 'first_name', 'last_name')->first();
        $spot->host_firstname = $host->first_name;
        $spot->host_lastname = $host->last_name;
        unset($spot->host);

        //isfavouritebyuser
        $user = Auth::user();
        $spot->is_favorite = $spot->isFavouriteForUser($user->user_id);
        
        // Append Amenities
        $allAmenities = $spot->amenities()->first();
        $amenities = [];
        if($allAmenities->is_covered){
            $amenities[] = 'Covered';
        }
        if($allAmenities->has_security){
            $amenities[] = 'Security';
        }
        if($allAmenities->has_ev_charging){
            $amenities[] = 'EV Charging';
        }
        if($allAmenities->is_handicap_accessible){
            $amenities[] = 'Handicap Accessible';
        }   
        if($allAmenities->has_lighting){
            $amenities[] = 'Lighting';
        }
        if($allAmenities->has_cctv){
            $amenities[] = 'CCTV';
        }   
        $spot->amenities = $amenities;

        // Append Locations
        $location = $spot->location()->first();
        $spot->location = $location;
        unset($spot->location->location_id);
        unset($spot->location->spot_id); 

        // Get Reviews 
        $reviews = $spot->reviews()->with('user:user_id,first_name,last_name')->get();
        
        // Include reviews in the response
        $reviews->each(function ($review) {
            $review->user_firstname = $review->user->first_name;
            $review->user_lastname = $review->user->last_name;
            unset($review->user);
        });
        $spot->reviews = $reviews;

        // Get availability
        $availability = $spot->availability()->get();

        // Include availability in the response
        $spot->availability = $availability;

        $bookings = $spot->bookings()->get();

        // Generate disabled date times
        $spot->disabledDateTimes = $this->getDisabledDateTimes($bookings);
        return $spot;
    }

    public function getDisabledDateTimes($bookings)
    {
        $disabledDateTimes = [];
    
        foreach ($bookings as $booking) {
            $startDate = \Carbon\Carbon::parse($booking->start_time);
            $endDate = \Carbon\Carbon::parse($booking->end_time);
    
            $date = $startDate->toDateString();
            $startHour = $startDate->hour;
            $endHour = $endDate->hour;
    
            $hours = range($startHour, $endHour - 1);
    
            if (!isset($disabledDateTimes[$date])) {
                $disabledDateTimes[$date] = [
                    'date' => $date,
                    'hours' => $hours
                ];
            } else {
                $disabledDateTimes[$date]['hours'] = array_unique(array_merge($disabledDateTimes[$date]['hours'], $hours));
            }
        }
    
        return array_values($disabledDateTimes);
    }

    public function updateOverallRating($spotId)
    {
        $spot = ParkingSpot::find($spotId);
        $reviews = Review::where('spot_id', $spot->spot_id)->get();
        $averageRating = $reviews->avg('rating');
        $spot->overall_rating = $averageRating;
        $spot->save();
    }

    public function bookSpot($request){
        $spotId = $request->route('spot_id');
        $spot = $this->spotRepo->getSpotById($spotId);
        $user = Auth::user();
        $bookingCost = $this->calculatePrice($spot, $request->start_time, $request->end_time);

        if($spot->status !== 'approved'){
            error_log('Spot is not approved');
            return null;
        }

        // Check if the user has enough balance
        $wallet = Wallets::where('user_id', $user->user_id)->first();
        if($wallet->balance < $bookingCost){
            error_log('User does not have enough balance');
            return null;
        }
    
        
        // Check if the requested times are within the spot's availability
        $availability = $spot->availability()
            ->where('day', Carbon::parse($request->start_time)->dayOfWeek)
            ->where('start_time', '<=', Carbon::parse($request->start_time)->format('H:i:s'))
            ->where('end_time', '>=', Carbon::parse($request->end_time)->format('H:i:s'))
            ->exists();

        if (!$availability) {
            error_log('Spot is not available at the requested time');
            return null;
        }

        // Check if the spot is already booked at the requested time
        $existingBookings = Booking::where('spot_id', $spotId)
            ->where('start_time', '<', $request->end_time)
            ->where('end_time', '>', $request->start_time)
            ->exists();

        if ($existingBookings) {
            error_log('Spot is already booked at the requested time');
            return null;
        }
       
        // Check if the booking time is in the past
        if (Carbon::parse($request->start_time)->isPast() || Carbon::parse($request->end_time)->isPast()) {
            error_log('Cannot book a spot in the past');
            return null;
        }
        // Create Booking
        $booking = new Booking();
        $booking->guest_id = $user->user_id;
        $booking->spot_id = $spotId;
        $booking->start_time = $request->start_time;
        $booking->end_time = $request->end_time;
        $booking->status = 'upcoming';
        $booking->total_price = $bookingCost;
        $booking->created_at = Carbon::now();
        $booking->save();

        return $booking;
    }

    public function calculatePrice($spot, $start_time, $end_time){
        $start = Carbon::parse($start_time);
        $end = Carbon::parse($end_time);
        $hours = $start->diffInHours($end);
        return $spot->price_per_hour * $hours;
    }

}
    

