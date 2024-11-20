<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SpotsController;
use App\Models\ParkingSpot;


Route::post('/user/signup', [UserController::class, 'signup']);
Route::post('/user/login', [UserController::class, 'login']);



Route::post('/fetch-parking-spots', [SpotsController::class, 'fetchParkingSpots'])->middleware('auth:api');
