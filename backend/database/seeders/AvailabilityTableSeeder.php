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
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 1, // Monday

            ],
            [
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 4, // Thursday

            ],
            [
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 5, // Friday

            ],
            [
                'spot_id' => 100,
                'start_time' => '10:00:00',
                'end_time' => '18:00:00',
                'day' => 6, // Saturday

            ],
            [
                'spot_id' => 100,
                'start_time' => '12:00:00',
                'end_time' => '16:00:00',
                'day' => 7, // Sunday

            ],
            // Spot 2
            [
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 1, // Monday

            ],
            [
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 4, // Thursday

            ],
            [
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 5, // Friday

            ],
            [
                'spot_id' => 101,
                'start_time' => '10:00:00',
                'end_time' => '14:00:00',
                'day' => 6, // Saturday

            ],
            [
                'spot_id' => 101,
                'start_time' => '11:00:00',
                'end_time' => '15:00:00',
                'day' => 7, // Sunday

            ],
            // Spot 3
            [
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 1, // Monday

            ],
            [
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 4, // Thursday

            ],
            [
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 5, // Friday

            ],
            [
                'spot_id' => 102,
                'start_time' => '09:00:00',
                'end_time' => '13:00:00',
                'day' => 6, // Saturday

            ],
            [
                'spot_id' => 102,
                'start_time' => '10:00:00',
                'end_time' => '14:00:00',
                'day' => 7, // Sunday

            ],
            // Spot 4
            [
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 1, // Monday

            ],
            [
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 4, // Thursday

            ],
            [
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 5, // Friday

            ],
            [
                'spot_id' => 103,
                'start_time' => '11:00:00',
                'end_time' => '15:00:00',
                'day' => 6, // Saturday

            ],
            [
                'spot_id' => 103,
                'start_time' => '12:00:00',
                'end_time' => '14:00:00',
                'day' => 7, // Sunday

            ],
        ]);
    }
}