<?php

namespace App\Observers;

use App\Site;
use App\Core\CategoryHelper;

class SiteObserver
{
    public function created(Site $site)
    {
        CategoryHelper::handle('scaffold', $site);
    }
}
