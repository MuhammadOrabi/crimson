<?php 

namespace App\Core;

interface TemplateInterface
{
    public static function do($op, $site, $page, $data, $component);
}
