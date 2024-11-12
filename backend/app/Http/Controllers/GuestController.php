<?php
namespace App\Http\Controllers;

use App\Models\Guest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class GuestController extends Controller
{
    // Signup Logic
    public function signup(Request $request)
    {   // Validate the request data for guest signup
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'phone_number' => 'required|string|max:15',
        ]);

        // Makes sure the email is unique
        if (Guest::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'Email already exists.'], 409); // Conflict status code
        }

        // Create an instance of this guest, save the guest data to the database
        $guest = new Guest();
        $guest->first_name = $request->first_name;
        $guest->last_name = $request->last_name;
        $guest->email = $request->email;
        $guest->phone_number = $request->phone_number;

        $pepper = env('PEPPER'); //Salting and peppering the password
        $guest->password = Hash::make($request->password.$pepper);

        $guest->save();

        // Return a JSON response to the user
        return response()->json(['message' => 'User created successfully'], 201);
    }

}