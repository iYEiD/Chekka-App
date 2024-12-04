<?php

namespace App\Services\Interfaces;

interface ISpotService{
    public function fetchParkingSpots($request);
    public function applyFilters($request);
    public function fetchParkingSpotsFiltered($request);
    public function transformSpots($spots);
    public function applyFavourites($spots, $userId);
    public function applyTimeRangeFilter($spots, $timeRange);
    public function updateFavoriteSpot($request);
    public function fetchParkingSpotDetails($request);
    public function getDisabledDateTimes($bookings);
    public function updateOverallRating($spotId);
    public function bookSpot($request);
    public function calculatePrice($spot, $start_time, $end_time);
}