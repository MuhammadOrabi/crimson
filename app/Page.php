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

    public function publicPath()
    {
        return $this->site->publicPath() . '/' . $this->slug;
    }

    public function dashboardPath()
    {
        return '/dashboard/pages/' . $this->id . '/' . $this->site->domain;
    }

    public function dashboard($op)
    {
        return $this->site->template->dashboard() . '.pages.' . $op;
    }

    public function front($op)
    {
        return $this->site->template->front() . '.pages.' . $op;
    }
}
