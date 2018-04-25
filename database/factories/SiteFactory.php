<?php

use Faker\Generator as Faker;

$factory->define(App\Site::class, function (Faker $faker) {
    $domain = $faker->unique()->domainName;
    return [
        'domain' => $domain,
        'name' => camel_case($domain),
        'user_id' => function () {
            return factory('App\User')->create()->id;
        },
        'template_id' => App\Template::all('id')->random(1)->first()->id
    ];
});
