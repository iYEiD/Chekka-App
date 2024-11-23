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
                'spot_id' => 100,
                'address' => 'Beirut Downtown',
                'city' => 'Beirut',
                'district' => 'Downtown',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'spot_id' => 101,
                'address' => 'Jounieh',
                'city' => 'Beirut',
                'district' => 'Jounieh',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
            ,
            [
                'spot_id' => 102,
                'address' => 'Bay Area',
                'city' => 'Beirut',
                'district' => 'Bay Area',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
            ,
            [
                'spot_id' => 103,
                'address' => 'Byblos Downtown',
                'city' => 'Byblos',
                'district' => 'Downtown',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}