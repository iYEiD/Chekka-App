<?php

namespace App\Services\Interfaces;

interface ISpotService{
    public function fetchParkingSpots($request);
    public function applyFilters($request);
    public function fetchParkingSpotsFiltered($request);
    public function transformSpots($spots);
    public function applyFavourites($spots, $userId);
}