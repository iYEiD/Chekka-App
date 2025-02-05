<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SpotAmenitiesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('spot_amenities')->insert([
            [
                'amenity_id' => 100,
                'spot_id' => 100,
                'is_covered' => true,
                'has_security' => true,
                'has_ev_charging' => false,
                'is_handicap_accessible' => true,
                'has_lighting' => true,
                'has_cctv' => true,
                'is_gated' => true,
            ],
            [
                'amenity_id' => 101,
                'spot_id' => 101,
                'is_covered' => false,
                'has_security' => false,
                'has_ev_charging' => true,
                'is_handicap_accessible' => false,
                'has_lighting' => true,
                'has_cctv' => false,
                'is_gated' => true,

            ],
            [
                'amenity_id' => 102,
                'spot_id' => 102,
                'is_covered' => true,
                'has_security' => false,
                'has_ev_charging' => true,
                'is_handicap_accessible' => false,
                'has_lighting' => true,
                'has_cctv' => true,
                'is_gated' => false,
            ],
            [
                'amenity_id' => 103,
                'spot_id' => 103,
                'is_covered' => true,
                'has_security' => true,
                'has_ev_charging' => true,
                'is_handicap_accessible' => true,
                'has_lighting' => true,
                'has_cctv' => true,
                'is_gated' => false,
            ]
        ]);
    }
}