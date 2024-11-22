<?php

namespace App\Repositories\Interfaces;


interface IBookingRepo
{
    public function filterBookedSpots($availableSpots, $timeRange);
}