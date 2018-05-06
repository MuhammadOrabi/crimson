<?php 

namespace App\Core;

class TemplateHelper
{

    /**
     * Construct The Helper Class and the function
     * ex:
     *      op: scaffold
     *      static::scaffold(---)
     * ex:
     *      op: dashboard-section-delete-auth, api-content-create-auth, front-page-view-guest, ...
     *      folder -> dashboard, api, front, ....
     *      class -> section, content, page, ....
     *      function -> delete, create, view, ....
     *      status -> auth, guest
     */
    public static function handle($path, $op, $site, $page, $data, $component)
    {
        if (str_contains($op, '-')) {
            $arr = explode('-', $op);

            $folder = ucfirst($arr[0]); 
            
            $class = ucfirst($arr[1]) . 'Helper';

            $function = $arr[2];

            $status = $arr[3];

            $fullClassPath = "$path\\$folder\\$class";

            return ($fullClassPath)::$function($status, $site, $page, $data, $component);
        } else {
            static::$op($site);
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
