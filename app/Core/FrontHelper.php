<?php

namespace App\Core;

class FrontHelper
{
    public static function view($status, $site, $page, $data, $component)
    {
        $view = $page->front('view');
        $data = compact('site', 'page');
        return compact('view', 'data');
    }
}
