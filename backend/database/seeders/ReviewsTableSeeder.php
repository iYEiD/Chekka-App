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
                'review_id' => 100,
                'booking_id' => 100,
                'spot_id' => 100,
                'user_id' => 106,
                'title' => 'Fantastic Stay',
                'rating' => 5,
                'comment' => 'Exceeded expectations. Host was accommodating.'
            ],
            [
                'review_id' => 101,
                'booking_id' => 101,
                'spot_id' => 101,
                'user_id' => 106,
                'title' => 'Great Location',
                'rating' => 4,
                'comment' => 'Perfect location. Spot was clean and comfortable.'
            ],
            [
                'review_id' => 102,
                'booking_id' => 102,
                'spot_id' => 100,
                'user_id' => 106,
                'title' => 'Excellent Host',
                'rating' => 5,
                'comment' => 'Host was responsive. Spot as described.'
            ]

        ]);
    }
}
