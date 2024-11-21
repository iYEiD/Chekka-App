<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AvailabilityTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('availability')->insert([
            [
                'spot_id' => 1,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '20:00:00',
                'day' => 1, // Monday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '20:00:00',
                'day' => 2, // Monday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '20:00:00',
                'day' => 1, // Monday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '20:00:00',
                'day' => 3, // Monday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 2,
                'start_time_availability' => '09:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 5, // Friday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 3,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 5, // Friday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 4,
                'start_time_availability' => '010:00:00',
                'end_time_availability' => '16:00:00',
                'day' => 3, // Friday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}