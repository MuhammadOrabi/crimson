<?php

namespace App\Core\Templates\Websites\Bizlight;

use App\Core\TemplateHelper;

class BizlightHelper extends TemplateHelper
{
    public static function scaffold($site)
    {
        parent::scaffold($site);

        $site->pages()->create([
            'slug' => 'about',
            'title' => 'About',
        ]);

        $site->pages()->create([
            'slug' => 'services',
            'title' => 'Services',
        ]);

        $site->pages()->create([
            'slug' => 'contact',
            'title' => 'Contact',
        ]);
    }
}
