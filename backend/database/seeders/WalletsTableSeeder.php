<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class WalletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('wallets')->insert([
            [
                'wallet_id' => 100,
                'user_id' => 105,
                'balance' => 1000.00,
                'last_updated' => Carbon::now()
            ],
            [
                'wallet_id' => 101,
                'user_id' => 106,
                'balance' => 500.00,
                'last_updated' => Carbon::now()
            ]
        ]);
    }
}
