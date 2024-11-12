<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GuestController;


Route::post('/signup', [GuestController::class, 'signup']);

