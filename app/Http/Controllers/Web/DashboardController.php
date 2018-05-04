<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Site;

class DashboardController extends Controller
{
    public function index($domain)
    {
        $site = auth()->user()->sites()->where('domain', $domain)->firstOrFail();
        return view('dashboard.index', compact('site'));
    }
}
