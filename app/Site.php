<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    protected $guarded = [];

    // Site Reltionships
    public function owner()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function users()
    {
        return $this->hasMany('App\User');
    }

    public function template()
    {
        return $this->belongsTo('App\Template');
    }

    public function pages()
    {
        return $this->hasMany('App\Page');
    }

    public function images()
    {
        return $this->morphMany('App\Image', 'iamgeable');
    }

    public function extras()
    {
        return $this->morphMany('App\Extra', 'extraable');
    }

    public function sections()
    {
        return $this->morphMany('App\Section', 'sectionable');
    }

    // Helper methods
    public function addPage($page)
    {
        return $this->pages()->create($page);
    }

    public function addImage($url)
    {
        return $this->imgs()->create(compact('url'));
    }

    public function dashboardPath()
    {
        return '/dashboard/' . $this->domain;
    }

    public function publicPath()
    {
        return '/' . $this->domain;
    }
}
