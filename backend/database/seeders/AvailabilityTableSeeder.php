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
            [   'availability_id' => 100,
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 1, // Monday

            ],
            [
                'availability_id' => 101,
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'availability_id' => 102,
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'availability_id' => 103,
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 4, // Thursday

            ],
            [
                'availability_id' => 104,
                'spot_id' => 100,
                'start_time' => '08:00:00',
                'end_time' => '20:00:00',
                'day' => 5, // Friday

            ],
            [
                'availability_id' => 105,
                'spot_id' => 100,
                'start_time' => '10:00:00',
                'end_time' => '18:00:00',
                'day' => 6, // Saturday

            ],
            [
                'availability_id' => 106,
                'spot_id' => 100,
                'start_time' => '12:00:00',
                'end_time' => '16:00:00',
                'day' => 7, // Sunday

            ],
            // Spot 2
            [
                'availability_id' => 107,
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 1, // Monday

            ],
            [
                'availability_id' => 108,
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'availability_id' => 109,
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'availability_id' => 110,
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 4, // Thursday

            ],
            [
                'availability_id' => 111,
                'spot_id' => 101,
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'day' => 5, // Friday

            ],
            [
                'availability_id' => 112,
                'spot_id' => 101,
                'start_time' => '10:00:00',
                'end_time' => '14:00:00',
                'day' => 6, // Saturday

            ],
            [
                'availability_id' => 113,
                'spot_id' => 101,
                'start_time' => '11:00:00',
                'end_time' => '15:00:00',
                'day' => 7, // Sunday

            ],
            // Spot 3
            [
                'availability_id' => 114,
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 1, // Monday

            ],
            [
                'availability_id' => 115,
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'availability_id' => 116,
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'availability_id' => 117,
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 4, // Thursday

            ],
            [
                'availability_id' => 118,
                'spot_id' => 102,
                'start_time' => '08:00:00',
                'end_time' => '17:00:00',
                'day' => 5, // Friday

            ],
            [
                'availability_id' => 119,
                'spot_id' => 102,
                'start_time' => '09:00:00',
                'end_time' => '13:00:00',
                'day' => 6, // Saturday

            ],
            [
                'availability_id' => 120,
                'spot_id' => 102,
                'start_time' => '10:00:00',
                'end_time' => '14:00:00',
                'day' => 7, // Sunday

            ],
            // Spot 4
            [
                'availability_id' => 121,
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 1, // Monday

            ],
            [
                'availability_id' => 122,
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 2, // Tuesday

            ],
            [
                'availability_id' => 123,
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 3, // Wednesday

            ],
            [
                'availability_id' => 124,
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 4, // Thursday

            ],
            [
                'availability_id' => 125,
                'spot_id' => 103,
                'start_time' => '10:00:00',
                'end_time' => '16:00:00',
                'day' => 5, // Friday

            ],
            [
                'availability_id' => 126,
                'spot_id' => 103,
                'start_time' => '11:00:00',
                'end_time' => '15:00:00',
                'day' => 6, // Saturday

            ],
            [
                'availability_id' => 127,
                'spot_id' => 103,
                'start_time' => '12:00:00',
                'end_time' => '14:00:00',
                'day' => 7, // Sunday

            ],
        ]);
    }
}