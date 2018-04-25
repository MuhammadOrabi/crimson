<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Artisan;
use App\Template;
use App\User;
use Faker\Factory as Faker;

class ViewTemplatesTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp()
    {
        parent::setUp();
        $this->template = Template::get()->random(1)->first();
        $this->user = factory('App\User')->create();
        $this->actingAs($this->user);
        $this->faker = Faker::create();
    }

    /** @test */
    public function a_user_can_view_all_templates()
    {
        $this->get('/templates')
             ->assertSee($this->template->name)
             ->assertSee($this->template->tags->first()->tag);
    }
    
    /** @test */
    public function a_user_can_view_single_template()
    {
        $this->get($this->template->path())
             ->assertSee($this->template->name);
    }

    /** @test */
    public function a_user_can_view_sites_that_are_associated_with_a_template()
    {
        $collection = [
            'template_id' => $this->template->id,
            'domain' => $this->faker->domainWord
        ];
        $response = $this->post('/dashboard/sites', $collection);
        $this->assertDatabaseHas('sites', $collection);
        $this->get($this->template->path())
             ->assertSee(camel_case($collection['domain']));
    }
}
