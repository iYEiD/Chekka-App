<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\UserService;
use App\Services\Interfaces\IUserService;
use App\Repositories\SpotRepo;
use App\Repositories\Interfaces\ISpotRepo;
Use App\Services\SpotService;
Use App\Services\Interfaces\ISpotService;
use App\Repositories\Interfaces\IBookingRepo;
use App\Repositories\BookingRepo;
use App\Services\Interfaces\ITicketService;
use App\Services\TicketService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IUserService::class, UserService::class);
        $this->app->bind(ISpotRepo::class, SpotRepo::class);
        $this->app->bind(ISpotService::class, SpotService::class);  
        $this->app->bind(IBookingRepo::class, BookingRepo::class);
        $this->app->bind(ITicketService::class, TicketService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {   
        // Auto update pending bookings
        // $bookingRepo = app(BookingRepo::class);
        // $bookingRepo->updatePendingBookings();

    }

}