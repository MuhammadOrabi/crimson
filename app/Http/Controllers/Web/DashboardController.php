<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Site;
use App\Page;

class DashboardController extends Controller
{
    public function index($domain)
    {
        $site = auth()->user()->sites()->where('domain', $domain)->firstOrFail();
        return view('dashboard.index', compact('site'));
    }

    public function pages(Page $page, $domain)
    {
        $site = auth()->user()->sites()->where('domain', $domain)->firstOrFail();
        abort_if($site->id !== $page->site->id);
        return view($page->dashboard('index'));        
    }
}
