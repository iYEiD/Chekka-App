<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TransactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('transactions')->insert([
            [
                'sender_wallet_id' => 1, // Assuming wallet_id 1 corresponds to user_id 105
                'receiver_wallet_id' => 2, // Assuming wallet_id 2 corresponds to the spot owner
                'booking_id' => 10,
                'transaction_type' => 'transferred',
                'deducted_amount' => 20.00,
                'received_amount' => 18.00, // Assuming a 10% commission
                'commission_amount' => 2.00,
                'created_at' => Carbon::now()->subDays(1),
            ],
            [
                'sender_wallet_id' => 1,
                'receiver_wallet_id' => 2,
                'booking_id' => 11,
                'transaction_type' => 'transferred',
                'deducted_amount' => 20.00,
                'received_amount' => 18.00,
                'commission_amount' => 2.00,
                'created_at' => Carbon::now()->subDays(2),
            ],
            [
                'sender_wallet_id' => 1,
                'receiver_wallet_id' => 2,
                'booking_id' => 12,
                'transaction_type' => 'refunded',
                'deducted_amount' => 30.00,
                'received_amount' => 27.00,
                'commission_amount' => 3.00,
                'created_at' => Carbon::now()->addDays(2),
            ],
            // Add more transactions as needed
        ]);
    }
}