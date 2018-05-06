<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('front.welcome');
});

Auth::routes();

Route::namespace('Dashboard')->group(function() {
    Route::middleware('auth')->prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', function () {
            return redirect()->route('dashboard.user.sites');
        });

        Route::get('/sites/create/{template}', 'SitesController@create')->name('sites.create');
        Route::resource('sites', 'SitesController')->except('create');
        
        Route::get('/sites', 'DashboardController@sites')->name('user.sites');
        Route::get('/{domain}', 'DashboardController@index')->name('index');
        Route::get('/pages/{page}/{domain}', 'DashboardController@pages')->name('pages');
    });
});

Route::namespace('Front')->group(function () {
    Route::resource('templates', 'TemplatesController');
});

Route::namespace('Site')->group(function () {
    Route::prefix('{domain}')->group(function () {
        Route::get('/{slug?}', 'SiteController@handle');
    });
});

// Route::domain('{domain}.' . env('APP_URL'))->group(function () {
//     Route::get('/{slug?}/{id?}', function () {
//         return view('front.welcome');
//     });
// });
