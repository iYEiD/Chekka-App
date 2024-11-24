<?php

namespace App\Services;

use App\Services\Interfaces\IUserService;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService implements IuserService{

    public function createUser($request){
       
        if(User::where('email', $request->email)->exists()) {
        return null;
        }

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->status = "pending"; //default pending
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save(); //save user to db

        return $user;


    }


    public function authenticateUser($request){
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            return $user;
        };
        return null;
    }

    public function getUser(){
        return Auth::user();
    }


    public function updateUserDetails($request){
        $user = Auth::user();
        if ($user) {
            $column = $request->column;
            $newValue = $request->newValue;
            if ($column !== null && $newValue !== null){
                if (in_array($column, ['first_name', 'last_name', 'phone_number', 'email'])) {
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

    public function fetchUserData(){
    $user = Auth::user();
    
    // Create a simplified user object
    $response = [
        'first_name' => $user->first_name,
    ];
    
    // Set FavoriteSpots
    $response['favoriteSpots'] = $user->favourites->map(function ($favourite) {
        return $favourite->parkingSpot;
    })->values();

    // Set Pending Bookings
    $response['upcomingBookings'] = $user->bookings->where('status', 'upcoming')->map(function ($booking) {
        $booking->spotDetails = $booking->parkingSpot;
        unset($booking->parkingSpot);
        return $booking;
    })->values();

    // Set Completed Bookings
    $response['completedBookings'] = $user->bookings->where('status', 'completed')->map(function ($booking) {
        $booking->is_reviewed = $booking->reviews()->where('user_id', $booking->guest_id)->exists();
        $booking->spotDetails = $booking->parkingSpot;
        unset($booking->parkingSpot);
        return $booking;
    })->values();

    // Set Cancelled Bookings
    $response['cancelledBookings'] = $user->bookings->where('status', 'cancelled')->map(function ($booking) {
        $booking->spotDetails = $booking->parkingSpot;
        unset($booking->parkingSpot);
        return $booking;
    })->values();

    return $response;
}

}
