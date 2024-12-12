<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // php artisan db:seed to run all these seeders
        
        // for individual seeder use the fct below
        // php artisan db:seed --class=ParkingSpotsTableSeeder 

        // Apply Local Seeders
        // $this->call(UsersTableSeeder::class); // If already ran user demo seeders don't uncomment
        // $this->call(ParkingSpotsTableSeeder::class);
        // $this->call(SpotLocationsTableSeeder::class);
        // $this->call(AvailabilityTableSeeder::class);
        // $this->call(SpotAmenitiesTableSeeder::class);
        // $this->call(BookingsTableSeeder::class);
        // $this->call(FavouritesTableSeeder::class);
        // $this->call(ReviewsTableSeeder::class);
        // $this->call(WalletsTableSeeder::class);
        $this->call(TransactionsTableSeeder::class);

    }
}
