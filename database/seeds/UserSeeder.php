<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Muhammad Orabi',
            'email' => 'orabi@app.com',
            'password' => bcrypt('password'),
            'site_id' => null
        ]);
    }
}
