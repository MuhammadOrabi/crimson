<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Faker\Factory as Faker;
use App\Template;
use App\User;

class SitesTest extends TestCase
{
    /** @test */
    public function it_has_an_owner()
    {
        $site = factory('App\Site')->create();
        $this->assertInstanceOf('App\User', $site->owner);
    }

    /** @test */
    public function it_has_template()
    {
        $site = factory('App\Site')->create();
        $this->assertInstanceOf('App\Template', $site->template);
    }
}
