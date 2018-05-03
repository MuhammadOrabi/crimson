<?php

namespace Tests\Feature;

use App\Template;
use App\User;
use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;


class SitesTest extends TestCase
{
    public $faker;
    public $user;

    public function setUp() 
    {
        parent::setUp();
        $this->faker = Faker::create();
        $this->user = factory('App\User')->create();
        $this->actingAs($this->user); 
    }

    /** @test */
    public function it_can_be_created_by_a_user()
    {
        $template = Template::where('name', 'bizlight')->first();
        $collection = [
            'template_id' => $template->id,
            'domain' => $this->faker->domainWord
        ];
        $response = $this->post('/dashboard/sites', $collection);
        $this->assertDatabaseHas('sites', $collection);
    }
    
    /** @test */
    public function it_has_home_page()
    {
        $site = $this->user->sites->sortByDesc('id')->first();
        $pages = $site->pages->where('homePage', true)->toArray();
        $this->assertCount(1, $pages);
    }

    /** @test */
    public function user_can_visit_home_page()
    {
        $site = $this->user->sites->sortByDesc('id')->first();
        $page = $site->pages->where('homePage', true)->first();
        $this->get($page->path())
             ->assertStatus(200);
    }
}
