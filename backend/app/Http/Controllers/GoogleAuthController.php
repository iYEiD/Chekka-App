<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Exception;


class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
{
    return Socialite::driver('google')->stateless()->redirect();
}

public function handleGoogleCallback()
{
    try {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::where('google_id', $googleUser->id)->first();
     
        if ($user === null) {
            error_log("user not found,creating new user");
            $user = User::create([
                'first_name' => $googleUser->user['given_name'],
                'last_name' => $googleUser->user['family_name'] ?? ' ',
                'email' => $googleUser->email,
                'password' => Hash::make(Str::random(16)),
                'google_id' => $googleUser->id,
                'status' => 'active',
                'phone_number' => ' ',
                'is_valid' => 1,
            ]);
            $user->save();
        
            Auth::login($user);
            $token = $user->createToken('access_token')->accessToken;
            return redirect()->away('http://localhost:4200/auth/google-login?' . http_build_query([
                'access_token' => $token,
                'user' => [
                    'id' => $user->user_id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                ]
            ]));
        }
        else {
            Auth::login($user);
            $token = $user->createToken('access_token')->accessToken;
            return redirect()->away('http://localhost:4200/auth/google-login?' . http_build_query([
                'access_token' => $token,
                'user' => [
                    'id' => $user->user_id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'phone_number' => $user->phone_number,
                ]
            ]));
        }

    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}
