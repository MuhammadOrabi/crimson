<?php

namespace Tests\Feature\Templates\Bizlight;

use App\Template;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BizlightTest extends TestCase
{

    public $user;
    public $site;

    public function setUp() 
    {
        parent::setUp();
        $template = Template::whereName('bizlight')->first();
        $this->user = factory('App\User')->create();
        $this->site = factory('App\Site')->create(['template_id' => $template->id]);
        $this->actingAs($this->user);
    }

    /** @test */
    public function it_has_four_pages() 
    {
        $this->assertCount(4, $this->site->pages);
    }
}
