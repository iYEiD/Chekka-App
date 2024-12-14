<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SpotService;
use Illuminate\Support\Facades\Auth;

class SpotsController extends Controller
{
    protected $spotService;

    public function __construct(SpotService $spotService)
    {
        $this->spotService = $spotService;
    }   


    public function fetchParkingSpots(Request $request){  
        $user = Auth::user();  
        if($user){
        $spots = $this->spotService->fetchParkingSpotsFiltered($request);
        return response()->json($spots);
    }
       return response()->json(['message' => 'User not authenticated'], 401);
    }

    
    public function fetchParkingSpotDetails(Request $request){
        $spot = $this->spotService->fetchParkingSpotDetails($request);
        return response()->json($spot);
    }   

    public function bookSpot(Request $request){
       $booking = $this->spotService->bookSpot($request);
       if($booking){
        return response()->json(['message' => 'Spot booked successfully', 'booking' => $booking], 201);
       }
       return response()->json(['message' => 'Unable to book spot'], 400);
    }

    public function getGateCode(Request $request){
        $gateCode = $this->spotService->getGateCode($request);
        if($gateCode){
            return response()->json($gateCode);
        }
        return response()->json(['message' => 'No valid booking found for this spot'], 403);
    }
}   

