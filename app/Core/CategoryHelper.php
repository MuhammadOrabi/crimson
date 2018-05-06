<?php

namespace App\Core;

class CategoryHelper
{
    /**
     * Construct the name of the template class
     * ex:
     *      template: bizlight
     *      Websites\Bizlight\BizlightHelper::handle(------) 
     */
    public static function handle($op, $site, $page = null, $data = null, $component = null)
    {
        $template = ucwords(preg_replace('/\s+/', '', $site->template->name));
        
        $tag = ucwords(camel_Case($site->template->category()->tag)) . 's';
        
        $Helper = "Helper";

        $path = "\App\Core\Templates\\$tag\\$template";

        $templateHelper = "$path\\$template$Helper";
        
        return ($templateHelper)::handle($path, $op, $site, $page, $data, $component);
    }
}
