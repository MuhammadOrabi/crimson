<?php

namespace App\Core\Templates\Websites\Bizlight;

use App\Core\TemplateInterface;

class BizlightHelper implements TemplateInterface
{
    public static function do($op, $site, $page, $data, $component)
    {
        $arr = explode('-', $op);

        $class = ucfirst($arr[0]) . 'Helper';

        $function = $arr[1];

        return ($class)::$function($site, $page, $data, $component);
    }
}
