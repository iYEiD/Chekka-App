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

    
}   

