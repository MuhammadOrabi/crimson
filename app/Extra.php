<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Extra extends Model
{
    protected $guarded = [];
    
    public function extraable()
    {
        return $this->morphTo();
    }
}
