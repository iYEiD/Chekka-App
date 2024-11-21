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
        $user->status = "active"; //default until implemented by admins
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

}
