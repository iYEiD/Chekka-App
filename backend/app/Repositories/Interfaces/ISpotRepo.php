<?php

namespace App\Repositories\Interfaces;



interface ISpotRepo
{
    public function getAllSpots();
    public function getSpotById($spotId);
    public function applyFilters($filters);
    public function addFavorite($spotId, $userId);
    public function removeFavorite($spotId, $userId);
}
