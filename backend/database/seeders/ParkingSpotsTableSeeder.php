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
                'spot_id' => 100,
                'host_id' => 1,
                'longitude' => 35.91449001922313,
                'latitude' => 34.424090984639335,
                'price_per_hour' => 10.00,
                'car_type' => 'Sedan',
                'title' => 'Beirut Downtown Parking Spot',
                'main_description' => 'A great spot in downtown Beirut.',
                'status' => 'available',
                'overall_rating' => 4.5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [   
                'spot_id' => 101,
                'host_id' => 2,
                'longitude' =>35.73046902767697,
                'latitude' =>  33.86262237753723, 
                'price_per_hour' => 15.00,
                'car_type' => 'SUV',
                'title' => 'Jounieh Parking Spot',
                'main_description' => 'Convenient spot in Jounieh.',
                'status' => 'available',
                'overall_rating' => 4.7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'spot_id' => 102,
                'host_id' => 3,
                'longitude' => 35.50250271915108,
                'latitude' => 33.679971947691946, 
                'price_per_hour' => 12.00,
                'car_type' => 'Truck',
                'title' => 'Sidon Downtown Parking Spot',
                'main_description' => 'Spacious spot in Sidon downtown.',
                'status' => 'available',
                'overall_rating' => 4.8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'spot_id' => 103,
                'host_id' => 2,
                'longitude' => 35.227844521388135,
                'latitude' => 33.19636888993977, 
                'price_per_hour' => 8.00,
                'car_type' => 'Compact',
                'title' => 'Byblos Central Parking Spot',
                'main_description' => 'Affordable spot in central Byblos.',
                'status' => 'available',
                'overall_rating' => 4.6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more entries as needed
        ]);
    }
}