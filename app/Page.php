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
    public function dashboard($op)
    {
        $slug = $this->slug ? $this->slug : 'index'; 
        return $this->site->template->dashboard() . '.' . $slug . '.' . $op;
    }

    public function front($op)
    {
        $slug = $this->slug ? $this->slug : 'index';        
        return $this->site->template->front() . '.' . $slug . '.' . $op;
    }
}
