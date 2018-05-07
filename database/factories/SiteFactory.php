<?php

use Faker\Generator as Faker;

$factory->define(App\Site::class, function (Faker $faker) {
    $domain = str_slug($faker->unique()->sentence($nbWords = 2), '-');
    
    return [
        'domain' => $domain,
        'name' => kebab_case($domain),
        'user_id' => function () {
            return factory('App\User')->create()->id;
        },
        'template_id' => App\Template::all('id')->random(1)->first()->id
    ];
});
