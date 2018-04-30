<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tag::create(['tag' => 'website', 'type' => 'category']);
        Tag::create(['tag' => 'portfolio', 'type' => 'category']);
        Tag::create(['tag' => 'web application', 'type' => 'category']);
        Tag::create(['tag' => 'blog', 'type' => 'category']);
    }
}
