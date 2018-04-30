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
Route::namespace('Web')->group(function () {
    Route::get('/', function () {
        return view('front.welcome');
    });
    
    Auth::routes();

    Route::resource('templates', 'TemplatesController');
    
    Route::middleware('auth')->prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/sites/create/{template}', 'SitesController@create')->name('sites.create');
        Route::resource('sites', 'SitesController')->except('create');
        Route::get('/{domain?}', 'DashboardController@index')->name('index');
    });
});

Route::get('/{domain}/{slug?}/{id?}', function () {
    return \App\Site::where('domain', request()->domain)->firstOrFail();
});
// Route::domain('{domain}.' . env('APP_URL'))->group(function () {
//     Route::get('/{slug?}/{id?}', function () {
//         return view('front.welcome');
//     });
// });
