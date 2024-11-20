<?php

namespace App\Repositories\Interfaces;



interface ISpotRepo
{
    public function getAllSpots();
    public function getSpotById($spotId);
    public function applyFilters($filters);
}