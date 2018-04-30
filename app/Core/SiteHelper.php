<?php

namespace App\Core\SiteHelper;

use Validator;

class SiteHelper
{
    public static function create($user, $data) 
    {
        $template = Template::findOrFail($data['template_id']);

        $user->sites()->create([
            'template_id' => $data['template_id'],
            'domain' => $data['domain']
        ]);
    }

    public static function validate($data) 
    {
        $validator = Validator::make($data, [
            'domain' => 'required|unique:sites',
            'template_id' => 'required|exists:templates,id'
        ]);

        
    }
}
