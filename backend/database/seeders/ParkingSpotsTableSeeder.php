<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ParkingSpotsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('parking_spots')->insert([
            [
                'host_id' => 1,
                'longitude' => -73.935242,
                'latitude' => 40.730610,
                'price_per_hour' => 10.00,
                'car_type' => 'Sedan',
                'title' => 'Downtown Parking Spot',
                'main_description' => 'A great spot in downtown.',
                'status' => 'available',
                'overall_rating' => 4.5, // New field added
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'host_id' => 2,
                'longitude' => -74.0060,
                'latitude' => 40.7128,
                'price_per_hour' => 15.00,
                'car_type' => 'SUV',
                'title' => 'Midtown Parking Spot',
                'main_description' => 'Convenient spot in midtown.',
                'status' => 'available',
                'overall_rating' => 4.7,
                'created_at' => now(),
                'updated_at' => now(),
                ],
                [
                'host_id' => 3,
                'longitude' => -118.2437,
                'latitude' => 34.0522,
                'price_per_hour' => 12.00,
                'car_type' => 'Truck',
                'title' => 'LA Downtown Parking Spot',
                'main_description' => 'Spacious spot in LA downtown.',
                'status' => 'available',
                'overall_rating' => 4.8,
                'created_at' => now(),
                'updated_at' => now(),
                ],
                [
                'host_id' => 2,
                'longitude' => -87.6298,
                'latitude' => 41.8781,
                'price_per_hour' => 8.00,
                'car_type' => 'Compact',
                'title' => 'Chicago Central Parking Spot',
                'main_description' => 'Affordable spot in central Chicago.',
                'status' => 'available',
                'overall_rating' => 4.6,
                'created_at' => now(),
                'updated_at' => now(),
                ],
            // Add more entries as needed
        ]);
    }
}