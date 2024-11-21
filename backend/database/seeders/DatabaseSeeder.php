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
        // php artisan db:seed --class=ParkingSpotsTableSeeder for individual seeder
        $this->call(ParkingSpotsTableSeeder::class);
        $this->call(SpotLocationsTableSeeder::class);
        $this->call(AvailabilityTableSeeder::class);
        $this->call(SpotAmenitiesTableSeeder::class);
    }
}
