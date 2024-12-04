<?php

namespace App\Services;

use App\Services\Interfaces\IUserService;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Booking;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
use App\Services\SpotService;
use App\Models\Wallets;
use Carbon\Carbon;

class UserService implements IuserService
{

    protected $spotService;

    public function __construct(SpotService $spotService)
    {
        $this->spotService = $spotService;
    }

    public function createUser($request)
    {

        if (User::where('email', $request->email)->exists()) {
            return null;
        }

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->status = "active"; //default pending - fix later
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save(); //save user to db

        DB::table('user_roles')->insert([
            'user_id' => $user->user_id,
            'role_id' => 3 // Default as Guest
        ]);

        return $user;
    }


    public function authenticateUser($request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            // Check if user is pending/blocked
            if ($user->status === 'pending' || $user->status === 'blocked') {
                return null;
            }
            return $user;
        };
        return null;
    }

    public function getUser()
    {
        return Auth::user();
    }


    public function updateUserDetails($request)
    {
        $user = Auth::user();
        if ($user) {
            $column = $request->column;
            $newValue = $request->newValue;
            $oldValue = $request->oldValue ?? null;

            if ($column !== null && $newValue !== null) {
                if ($column === 'password' && $oldValue !== null) {
                    if (Hash::check($oldValue, $user->password)) {
                        $user->password = Hash::make($newValue);
                        $user->save();
                        return $user;
                    } else {
                        return null; // Old password does not match
                    }
                } elseif (in_array($column, ['first_name', 'last_name', 'phone_number', 'email'])) {
                    if ($column == 'first_name' || $column == 'last_name') {
                        if (!preg_match("/^[a-zA-Z]+$/", $newValue)) {
                            return null; // Invalid name
                        }
                    } elseif ($column == 'phone_number') {
                        if (!preg_match("/^[0-9]{10,15}$/", $newValue)) {
                            return null; // Invalid phone number
                        }
                    } elseif ($column == 'email') {
                        if (!filter_var($newValue, FILTER_VALIDATE_EMAIL)) {
                            return null; // Invalid email
                        }
                    }
                    $user->$column = $newValue;
                    $user->save();
                    return $user;
                }
            }
        }

        return null;
    }

    public function fetchUserData()
    { //USER DASHBOARD
        $user = Auth::user();

        // Create a simplified user object
        $response = [
            'first_name' => $user->first_name,
        ];

        // Set FavoriteSpots
        $response['favoriteSpots'] = $user->favourites->map(function ($favourite) {
            $spot = $favourite->parkingSpot;
            $spot->location = $spot->location()->first();
            unset($spot->location->location_id);
            unset($spot->location->spot_id); 
            return $spot;
        })->values();
       
        // Set Pending Bookings
        $response['upcomingBookings'] = $user->bookings->where('status', 'upcoming')->filter(function ($booking) {
            return $booking->start_time > now()->setTimezone('Asia/Beirut') && $booking->end_time > now()->setTimezone('Asia/Beirut');
        })->map(function ($booking) {
            $spot = $booking->parkingSpot;
            $spot->location = $spot->location()->first();
            unset($spot->location->location_id);
            unset($spot->location->spot_id);
            $booking->spotDetails = $spot;
            unset($booking->parkingSpot);
            return $booking;
        })->values();

        $response['currentBookings'] = $user->bookings->where('status', 'upcoming')->filter(function ($booking) {
            return $booking->start_time <= now()->setTimezone('Asia/Beirut') && $booking->end_time >= now()->setTimezone('Asia/Beirut');
        })->map(function ($booking) {
            $spot = $booking->parkingSpot;
            $spot->location = $spot->location()->first();
            unset($spot->location->location_id);
            unset($spot->location->spot_id); 
            $booking->spotDetails = $spot;
            unset($booking->parkingSpot);
            return $booking;
        })->values();

        // Set Completed Bookings
        $response['completedBookings'] = $user->bookings->where('status', 'completed')->map(function ($booking) {
            $spot = $booking->parkingSpot;
            $spot->location = $spot->location()->first();
            unset($spot->location->location_id);
            unset($spot->location->spot_id); 
            $booking->is_reviewed = $booking->reviews()->where('user_id', $booking->guest_id)->exists();
            $booking->spotDetails = $spot;
            unset($booking->parkingSpot);
            return $booking;
        })->values();

        // Set Cancelled Bookings
        $response['cancelledBookings'] = $user->bookings->where('status', 'cancelled')->map(function ($booking) {
            $spot = $booking->parkingSpot;
            $spot->location = $spot->location()->first();
            unset($spot->location->location_id);
            unset($spot->location->spot_id);
            $booking->spotDetails = $spot;
            unset($booking->parkingSpot);
            return $booking;
        })->values();

        return $response;
    }

    public function submitReview($bookingId, $data)
    {
        $user = Auth::user();

        // Validate that the booking exists and belongs to the user
        $booking = Booking::where('booking_id', $bookingId)
            ->where('guest_id', $user->user_id)
            ->first();

        if (!$booking) {
            return null; // Booking not found or does not belong to the user
        }
        if ($booking->status !== 'completed') {
            return null; // Cannot review a booking that is not completed
        }
        // Create the review
        // Check if a review already exists for this booking
        $review = Review::where('booking_id', $bookingId)
            ->where('user_id', $user->user_id)
            ->first();

        if ($review) {
            // Update the existing review
            $review->title = $data['title'];
            $review->rating = $data['rating'];
            $review->comment = $data['comment'];
            $review->save();
        } else {
            // Create a new review
            $review = new Review();
            $review->booking_id = $bookingId;
            $review->spot_id = $booking->spot_id; 
            $review->user_id = $user->user_id;
            $review->title = $data['title'];
            $review->rating = $data['rating'];
            $review->comment = $data['comment'];
            $review->save();
        }

        // Update the overall rating for the spot
        $this->spotService->updateOverallRating($booking->spot_id);

        // TODO: Send email to host


        return $review;
    }

    public function deleteBooking($bookingId)
    {
        $booking = Booking::where('booking_id', $bookingId)->where('guest_id', Auth::user()->user_id)->first();
        if (!$booking) {
            return null; // Booking is not his
        }
        $booking->delete();
        return $booking;
    }

    public function createWallet($userId)
    {
        $wallet = new Wallets();
        $wallet->user_id = $userId;
        $wallet->balance = 1000; //default balance, to update later
        $wallet->last_updated = Carbon::now();
        $wallet->save();
        return $wallet;
    }
}
