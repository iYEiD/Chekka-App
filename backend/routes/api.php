<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SpotsController;


// Users
Route::post('/user/signup', [UserController::class, 'signup']);
Route::post('/user/login', [UserController::class, 'login']);


// Parking Spots
Route::post('/parking-spots/fetch-parking-spots', [SpotsController::class, 'fetchParkingSpots'])->middleware('auth:api');
//TODO: parking-spots/update-favorite/{spot_id} + or params for details
