<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavouritesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('favourites')->insert([
            [
                'favourite_id' => 100,
                'user_id' => 105,
                'spot_id' => 100,
            ],
            [
                'favourite_id' => 101,
                'user_id' => 106,
                'spot_id' => 101,
            ],
            [
                'favourite_id' => 102,
                'user_id' => 105,
                'spot_id' => 102,
            ],
            [
                'favourite_id' => 103,
                'user_id' => 106,
                'spot_id' => 103,
            ],
            
        ]);

    }
}
