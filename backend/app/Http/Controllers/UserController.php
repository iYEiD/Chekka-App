<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use \Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    //
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
        
        // Check if the email already exists
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'Email already exists!'], 409);
        }

        // Create a new user instance and save the user data to the database
        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->status = "active"; //default until implemented by admins
        $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        // Generate a token for the user with custom claims
        $token = $user->createToken('accessToken')->accessToken;

        // Return a JSON response to the user with the token
        return response()->json(['accessToken' => $token], 201);
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

        // Attempt to log the user in
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $token = $user->createToken('accessToken')->accessToken;
            return response()->json(['accessToken' => $token], 200);
        }

        return response()->json(['message' => 'Wrong Password!'], 401);
    }
}
