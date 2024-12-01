<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SpotsController;


// Users
Route::post('/user/signup', [UserController::class, 'signup']);
Route::post('/user/login', [UserController::class, 'login']);
Route::post('/user/update-details', [UserController::class, 'updateDetails'])->middleware('auth:api');
Route::get('/user/user-details', [UserController::class, 'userDetails'])->middleware('auth:api');
Route::get('/user/user-dashboard', [UserController::class, 'userDashboard'])->middleware('auth:api');
Route::post('/user/logout', [UserController::class, 'logout'])->middleware('auth:api');


// Parking Spots
Route::post('/parking-spots/fetch-parking-spots', [SpotsController::class, 'fetchParkingSpots'])->middleware('auth:api');
Route::post('/parking-spots/update-favorite/{spot_id}', [UserController::class, 'favouriteASpot'])->middleware('auth:api');
Route::get('/parking-spots/fetch-parking-spot-details/{spot_id}', [SpotsController::class, 'fetchParkingSpotDetails'])->middleware('auth:api');
Route::post('/user/parking-spots/submit-review/{bookingId}', [UserController::class, 'submitReview'])->middleware('auth:api');
Route::delete('/user/parking-spots/delete-booking/{bookingId}', [UserController::class, 'deleteBooking'])->middleware('auth:api');
