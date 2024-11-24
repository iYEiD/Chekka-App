<?php

namespace App\Repositories;

use App\Repositories\Interfaces\IBookingRepo;
use Illuminate\Support\Facades\DB;
use App\Models\Booking;

class BookingRepo implements IBookingRepo
{
    
public function filterBookedSpots($availableSpots, $timeRange)
{
    $arrival = \DateTime::createFromFormat('d/m/Y:H:i', $timeRange[0]);
    $departure = \DateTime::createFromFormat('d/m/Y:H:i', $timeRange[1]);

    if (!$arrival || !$departure) {
        throw new \Exception('Invalid time range format');
    }

    $startTime = $arrival->format('Y-m-d H:i:s');
    $endTime = $departure->format('Y-m-d H:i:s');

    $bookedSpots = DB::table('bookings')
        ->whereIn('spot_id', $availableSpots->pluck('spot_id'))
        ->where('start_time', '<', $endTime)
        ->where('end_time', '>', $startTime)
        ->pluck('spot_id');

    error_log('Booked Spot IDs [REMOVED FROM LIST]: ' . implode(', ', $bookedSpots->toArray()));
    return $availableSpots->whereNotIn('spot_id', $bookedSpots);

}

public function updatePendingBookings()
{
    $pendingBookings = Booking::where('status', 'upcoming')->get();

    foreach ($pendingBookings as $booking) {
        if (\Carbon\Carbon::now()->greaterThan($booking->start_time)) {
            $booking->status = 'completed';
            $booking->timestamps = false;
            $booking->save();
            $booking->timestamps = true;
        }
    }
}


}