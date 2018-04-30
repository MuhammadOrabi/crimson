<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $guarded = [];

    public function sites()
    {
        return $this->hasMany('App\Site');
    }

    public function images()
    {
        return $this->morphMany('App\Image', 'imageable');
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }
    
    public function category()
    {
        return $this->tags->where('type', 'category')->first();
    }

    public function location()
    {
        $tag = $this->tags->where('type', 'category')->first();
        return 'templates.' . $tag->name . '.' . $this->name;
    }

    public function path()
    {
        return '/templates/' . $this->id;
    }

    public function createPath() {
        return '/dashboard/sites/create/' . $this->id;
    }
}
