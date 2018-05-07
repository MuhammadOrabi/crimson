<?php

namespace App\Core;

class DashboardHelper
{
    public static function view($status, $site, $page, $data, $component)
    {
        $view = $page->dashboard('view');
        $data = compact('site', 'page');
        return compact('view', 'data');
    }
}
