<?php

namespace App\Observers;

use App\Site;
use App\Core\Templates\CategoryHelper;

class SiteObserver  
{
    public function created(Site $site)
    {
        CategoryHelper::direct('scaffold', $site);
    }
}
