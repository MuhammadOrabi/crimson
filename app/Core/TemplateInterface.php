<?php 

namespace App\Core\Templates;

interface TemplateInterface
{
    public static function do($op, $site, $page, $data, $component);
}

