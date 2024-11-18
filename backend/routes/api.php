<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Models\ParkingSpot;


Route::post('/user/signup', [UserController::class, 'signup']);
Route::post('/user/login', [UserController::class, 'login']);

//Used for testing, returns the authenticated user
Route::get('/who', function (Request $request) {
    return response()->json($request->user());
})->middleware('auth:api');

//Returns details of all parking spots (NO AMENITIES)
Route::get('/spots', function (Request $request) {
    return response()->json(ParkingSpot::all());
})->middleware('auth:api');


