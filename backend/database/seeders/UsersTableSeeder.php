<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            [   'user_id' => 105,
                'first_name' => 'Demo',
                'last_name' => 'Tester',
                'phone_number' => '1234567890',
                'status' => 'active',
                'email' => 'demo@gmail.com',
                'password' => bcrypt('password'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'is_valid'=>1,
            ],
            [   'user_id' => 106,   
                'first_name' => 'Jane',
                'last_name' => 'Doe',
                'phone_number' => '0987654321',
                'status' => 'active',
                'email' => 'demo2@gmail.com',
                'password' => bcrypt('password'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'is_valid'=>1,
            ],
        ]);


        DB::table('user_roles')->insert([
            ['userrole_id' => 100, 'user_id' => 105, 'role_id' => 3],
            ['userrole_id' => 101, 'user_id' => 106, 'role_id' => 3],
            ['userrole_id' => 102, 'user_id' => 106, 'role_id' => 2],
        ]);
    }
}
