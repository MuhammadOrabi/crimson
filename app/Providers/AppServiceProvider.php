<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Site;
use App\Observers\SiteObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Site::observe(SiteObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
