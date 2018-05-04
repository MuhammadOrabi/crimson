<?php

namespace App\Core\Templates\Websites\Bizlight;

use App\Core\TemplateInterface;

class BizlightHelper implements TemplateInterface
{
    public static function do($op, $site, $page, $data, $component)
    {
        if (str_contains($op, '-')) {
            $arr = explode('-', $op);
    
            $class = ucfirst($arr[0]) . 'Helper';
    
            $function = $arr[1];
    
            return ($class)::$function($site, $page, $data, $component);
        } else {
            self::$op($site);
        }
    }

    public static function scaffold($site)
    {
        $site->pages()->create([
            'title' => 'homePage',
            'homePage' => true,
            'slug' => ''
        ]);
    }
}
