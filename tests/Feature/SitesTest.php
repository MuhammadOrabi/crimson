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
    public $site;

    public function setUp()
    {
        parent::setUp();
        $this->faker = Faker::create();
        $this->user = factory('App\User')->create();
        $this->actingAs($this->user);
        $this->site = factory('App\Site')->create(['user_id' => $this->user->id]);
    }

    /** @test */
    public function it_can_be_created_by_a_user()
    {
        $site = factory('App\Site')->make(['user_id' => $this->user->id]);
        $response = $this->post('/dashboard/sites', $site->toArray());
        $this->assertDatabaseHas('sites', $site->toArray());
    }
    
    /** @test */
    public function it_has_home_page()
    {
        $pages = $this->site->pages->where('homePage', true)->toArray();
        $this->assertCount(1, $pages);
    }

    /** @test */
    public function users_can_visit_home_page()
    {
        $page = $this->site->pages->where('homePage', true)->first();
        $this->get($page->path())
             ->assertStatus(200);
    }

    /** @test */
    public function it_has_dashboard()
    {
        $this->get($this->site->dashboardPath())
             ->assertStatus(200);
    }
    
    /** @test */
    public function its_dashboard_can_only_be_accessed_by_its_owner()
    {
        $user = factory('App\User')->create();
        $this->actingAs($user);
        $this->get($this->site->dashboardPath())
             ->assertStatus(404);
    }
}
