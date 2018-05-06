<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $guarded = [];

    public function images()
    {
        return $this->morphMany('App\Image', 'imageable');
    }

    public function templates()
    {
        return $this->morphedByMany('App\Template', 'taggable');
    }

    public function slug()
    {
        return str_slug($this->tag);
    }
}
