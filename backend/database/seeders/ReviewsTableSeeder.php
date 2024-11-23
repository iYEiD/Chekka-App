<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('reviews')->insert([
            [
                'booking_id' => 1,
                'spot_id' => 100,
                'user_id' => 106,
                'title' => 'Fantastic Stay',
                'rating' => 5,
                'comment' => 'Exceeded expectations. Host was accommodating.'
            ],
            [
                'booking_id' => 2,
                'spot_id' => 101,
                'user_id' => 106,
                'title' => 'Great Location',
                'rating' => 4,
                'comment' => 'Perfect location. Spot was clean and comfortable.'
            ],
            [
                'booking_id' => 3,
                'spot_id' => 100,
                'user_id' => 106,
                'title' => 'Excellent Host',
                'rating' => 5,
                'comment' => 'Host was responsive. Spot as described.'
            ]

        ]);
    }
}
