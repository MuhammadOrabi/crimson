<?php

namespace App\Core\Templates;

class CategoryHelper
{
    /**
     * Construct the name of the template class
     */
    public static function direct($op, $site, $page, $data = null, $component = null)
    {
        $templatePath = ucwords(preg_replace('/\s+/', '', $site->template->name));
        
        $tag = ucwords(camel_Case($site->template->category()->tag)) . 's';
        
        $templateHelper = "$tag\\$templatePath\\$templatePath" . "Helper";

        return ($templateHelper)::do($op, $site, $page, $data, $component);
    }
}
