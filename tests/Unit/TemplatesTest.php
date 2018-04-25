<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Template;

class TemplatesTest extends TestCase
{
    /** @test */
    public function it_has_sites()
    {
        $template = Template::all()->random(1)->first();
        $this->assertContainsOnlyInstancesOf('App\Site', $template->sites);
    }

    /** @test */
    public function it_has_tags()
    {
        $template = Template::all()->random(1)->first();
        $this->assertContainsOnlyInstancesOf('App\Tag', $template->tags);
    }
}
