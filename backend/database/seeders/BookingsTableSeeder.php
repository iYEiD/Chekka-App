<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('bookings')->insert([
            // Spot 1
            [
                'spot_id' => 100,
                'guest_id' => 105,
                'start_time' => Carbon::now()->subDays(1)->setTime(8, 0),
                'end_time' => Carbon::now()->subDays(1)->setTime(20, 0),
                'status' => 'completed',
                'total_price' => 20.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 100,
                'guest_id' => 105,
                'start_time' => Carbon::now()->addDays(2)->setTime(10, 0),
                'end_time' => Carbon::now()->addDays(2)->setTime(18, 0),
                'status' => 'upcoming',
                'total_price' => 30.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Spot 2
            [
                'spot_id' => 101,
                'guest_id' => 105,
                'start_time' => Carbon::now()->addDays(3)->setTime(9, 0),
                'end_time' => Carbon::now()->addDays(3)->setTime(17, 0),
                'status' => 'upcoming',
                'total_price' => 50.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 101,
                'guest_id' => 106,
                'start_time' => Carbon::now()->addDays(4)->setTime(11, 0),
                'end_time' => Carbon::now()->addDays(4)->setTime(15, 0),
                'status' => 'upcoming',
                'total_price' => 40.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Spot 3
            [
                'spot_id' => 102,
                'guest_id' => 106,
                'start_time' => Carbon::now()->addDays(5)->setTime(8, 0),
                'end_time' => Carbon::now()->addDays(5)->setTime(17, 0),
                'status' => 'upcoming',
                'total_price' => 130.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 102,
                'guest_id' => 106,
                'start_time' => Carbon::now()->addDays(6)->setTime(9, 0),
                'end_time' => Carbon::now()->addDays(6)->setTime(13, 0),
                'status' => 'upcoming',
                'total_price' => 70.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Spot 4
            [
                'spot_id' => 103,
                'guest_id' => 105,
                'start_time' => Carbon::now()->addDays(7)->setTime(10, 0),
                'end_time' => Carbon::now()->addDays(7)->setTime(16, 0),
                'status' => 'upcoming',
                'total_price' => 90.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 103,
                'guest_id' => 105,
                'start_time' => Carbon::now()->addDays(8)->setTime(12, 0),
                'end_time' => Carbon::now()->addDays(8)->setTime(14, 0),
                'status' => 'upcoming',
                'total_price' => 50.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Add more sample data as needed
        ]);
    }
}
