<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SpotLocationsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('spot_locations')->insert([
            [
                'spot_id' => 1,
                'address' => '123 Main St',
                'city' => 'Bangalore',
                'district' => 'Central',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 2,
                'address' => '456 Elm St',
                'city' => 'Mountain View',
                'district' => 'Santa Clara',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
            ,
            [
                'spot_id' => 3,
                'address' => '789 Pine St',
                'city' => 'San Francisco',
                'district' => 'Bay Area',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
            ,
            [
                'spot_id' => 4,
                'address' => '101 Oak St',
                'city' => 'Los Angeles',
                'district' => 'Downtown',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}