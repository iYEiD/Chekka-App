<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Illuminate\Validation\ValidationException;
use App\Services\UserService; 
use App\Services\SpotService;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{   
    protected $userService;
    protected $spotService;

    public function __construct(UserService $userService, SpotService $spotService)
    {
        $this->userService = $userService; // Assign the injected service to the property
        $this->spotService = $spotService;
    }

    public function signup(Request $request)
    {
        // Validate the request data for user signup
        try {
            $request->validate([
                'first_name' => 'required|string|max:30',
                'last_name' => 'required|string|max:30',
                'email' => 'required|string|email',
                'password' => 'required|string|min:8|confirmed',
                'phone_number' => 'required|string|max:15',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        }
        

        $user = $this->userService->createUser($request);
        
        if ($user == null) {
            return response()->json(['message' => 'Email already in use!'], 409);
        }

        //Passed all tests, user exists, generate token and pass
        return response()->json(['message' => 'User created successfully'], 201);
    }



    // Login Logic
    public function login(Request $request)
    {
        try {
            // Validate the request data for login
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation Error', 'errors' => $e->errors()], 422);
        }
        // TO CHECK
        $user = $this->userService->authenticateUser($request);
        // Attempt to log the user in
        if ($user == null) {
            return response()->json(['message' => 'Wrong email or password!'], 401);
        }

        $token = $user->createToken('access_token')->accessToken;
        return response()->json([
            'access_token' => $token,
            'user' => [
                'id' => $user->user_id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
            ],
        ], 200);
       
    }

    public function logout(Request $request){
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }   

    public function favouriteASpot(Request $request){
        $this->spotService->updateFavoriteSpot($request);
    }

    public function updateDetails(Request $request){
       if($this->userService->updateUserDetails($request) === null){
        return response()->json(['message' => 'Invalid request'], 400);
       }
       return response()->json(['message' => 'User details updated successfully'], 200);
    }

    public function userDashboard(){
        $userData = $this->userService->fetchUserData();
        return response()->json($userData, 200);
    }   

    public function userDetails(){
        $user = $this->userService->getUser();
        return response()->json($user, 200);
    }

    public function submitReview(Request $request)
{
    // Validate the incoming request
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'comment' => 'required|string',
        'rating' => 'required|numeric|min:1|max:5',
    ]);

    if ($validator->fails()) {
        return response()->json(['message' => 'Invalid request'], 404);
    }

    $review = $this->userService->submitReview($request->route('bookingId'), $request->only(['title', 'comment', 'rating']));

    if ($review === null) {
        return response()->json(['message' => 'Booking not found or does not belong to the user'], 404);
    }

        return response()->json(['message' => 'Review submitted successfully', 'review' => $review], 201);
    }

    public function deleteBooking(Request $request){
        $result = $this->userService->deleteBooking($request->route('bookingId'));
        if ($result === null) {
            return response()->json(['message' => 'Booking not found or does not belong to the user'], 404);
        }
    }
}
