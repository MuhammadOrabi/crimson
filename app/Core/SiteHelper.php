<?php

namespace App\Core\SiteHelper;

use App\Core\Templates\CategoryHelper;
use App\Template;
use Validator;

class SiteHelper
{
    public static function create($user, $data) 
    {
        $validator = self::validate($data);
        if ($validator->fails()) {
            dd($validator);
        }

        $template = Template::findOrFail($data['template_id']);

        $site = $user->sites()->create([
            'template_id' => $data['template_id'],
            'domain' => $data['domain'],
            'name' => $data['name']
        ]);

        return $site;
    }

    public static function validate($data) 
    {
        return Validator::make($data, [
            'domain' => 'required|unique:sites',
            'template_id' => 'required|exists:templates,id'
        ]);
    }
}
