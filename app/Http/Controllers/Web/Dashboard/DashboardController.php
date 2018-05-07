<?php

namespace App\Http\Controllers\Web\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Site;
use App\Page;
use App\Core\CategoryHelper;

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

        abort_if($site->id !== $page->site->id, 404);

        extract(
            CategoryHelper::handle('dashboard-page-view-auth', $site, $page)
        );

        return view($view, $data);
    }
}
