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
            // Spot 1
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
                'day' => 2, // Tuesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '20:00:00',
                'day' => 3, // Wednesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '20:00:00',
                'day' => 4, // Thursday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '20:00:00',
                'day' => 5, // Friday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '18:00:00',
                'day' => 6, // Saturday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 1,
                'start_time_availability' => '12:00:00',
                'end_time_availability' => '16:00:00',
                'day' => 7, // Sunday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Spot 2
            [
                'spot_id' => 2,
                'start_time_availability' => '09:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 1, // Monday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 2,
                'start_time_availability' => '09:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 2, // Tuesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 2,
                'start_time_availability' => '09:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 3, // Wednesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 2,
                'start_time_availability' => '09:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 4, // Thursday
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
                'spot_id' => 2,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '14:00:00',
                'day' => 6, // Saturday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 2,
                'start_time_availability' => '11:00:00',
                'end_time_availability' => '15:00:00',
                'day' => 7, // Sunday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Spot 3
            [
                'spot_id' => 3,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 1, // Monday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 3,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 2, // Tuesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 3,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 3, // Wednesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 3,
                'start_time_availability' => '08:00:00',
                'end_time_availability' => '17:00:00',
                'day' => 4, // Thursday
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
                'spot_id' => 3,
                'start_time_availability' => '09:00:00',
                'end_time_availability' => '13:00:00',
                'day' => 6, // Saturday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 3,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '14:00:00',
                'day' => 7, // Sunday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Spot 4
            [
                'spot_id' => 4,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '16:00:00',
                'day' => 1, // Monday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 4,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '16:00:00',
                'day' => 2, // Tuesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 4,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '16:00:00',
                'day' => 3, // Wednesday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 4,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '16:00:00',
                'day' => 4, // Thursday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 4,
                'start_time_availability' => '10:00:00',
                'end_time_availability' => '16:00:00',
                'day' => 5, // Friday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 4,
                'start_time_availability' => '11:00:00',
                'end_time_availability' => '15:00:00',
                'day' => 6, // Saturday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 4,
                'start_time_availability' => '12:00:00',
                'end_time_availability' => '14:00:00',
                'day' => 7, // Sunday
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}