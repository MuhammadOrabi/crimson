<?php

namespace App\Http\Controllers\Web\Site;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Core\CategoryHelper;

class SiteController extends Controller
{
    public function handle()
    {
        $slug = request()->slug ? request()->slug : '';
        $site = \App\Site::where('domain', request()->domain)->firstOrFail();
        $page = $site->pages()->whereActive(true)->whereSlug($slug)->firstOrFail();

        extract(
            CategoryHelper::handle('front-page-view-guest', $site, $page)
        );
        
        return view($view, $data);
    }
}
