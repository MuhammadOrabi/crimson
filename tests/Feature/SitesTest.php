<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SitesTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();

        $this->site = factory('App\Site')->create();
    }
    
    /** @test */
    public function it_has_home_page()
    {
        $pages = $this->site->pages->where('homePage', true)->toArray();
        $this->assertCount(1, $pages);
    }

    /** @test */
    public function user_can_visit_home_page()
    {
        $page = $this->site->pages->where('homePage', true)->first();
        $this->get($page->path())
             ->assertStatus(200);
    }
}
