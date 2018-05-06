<?php

namespace App\Http\Controllers\Web\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Site;
use App\Page;

class DashboardController extends Controller
{

    public function sites()
    {
        $sites = auth()->user()->sites;
        return  view('dashboard.sites.index', compact('sites'));
    }

    public function index($domain)
    {
        $site = auth()->user()->sites()->whereDomain($domain)->firstOrFail();
        return view('dashboard.index', compact('site'));
    }

    public function pages(Page $page, $domain)
    {
        $site = auth()->user()->sites()->whereDomain($domain)->firstOrFail();
        abort_if($site->id !== $page->site->id);
        $slug = $page->slug ===  '' ? 'index' : $page->slug; 
        return view($page->dashboard($slug));
    }
}
