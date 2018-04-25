<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $guarded = [];
    
    public function sectionable()
    {
        return $this->morphTo();
    }

    public function contents()
    {
        return $this->morphMany('App\Content', 'contentable');
    }

    public function extras()
    {
        return $this->morphMany('App\Extra', 'extraable');
    }
}
