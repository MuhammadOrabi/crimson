<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $guarded = [];

    public function site()
    {
        return $this->belongsTo('App\Site');
    }

    public function sections()
    {
        return $this->morphMany('App\Section', 'sectionable');
    }

    public function path()
    {
        return $this->site->publicPath() . '/' . $this->slug;
    }
}
