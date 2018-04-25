<?php

use Illuminate\Database\Seeder;
use App\Tag;

class TemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tag_website = Tag::where('tag', 'website')->firstOrFail();
        $tag_website->templates()->create(
            ['name' => 'bizlight', 'type' => 'agency']
        );
        $tag_portfolio = Tag::where('tag', 'portfolio')->firstOrFail();
        $tag_portfolio->templates()->create(
            ['name' => 'template1', 'type' => 'portfolio']
        );
        $tag_webApp = Tag::where('tag', 'web application')->firstOrFail();
        $tag_webApp->templates()->create(
            ['name' => 'elearning', 'type' => 'eLearning']
        );

        $tag_blog = Tag::where('tag', 'blog')->firstOrFail();
        $tag_blog->templates()->create(
            ['name' => 'template1', 'type' => 'blog']
        );
    }
}
