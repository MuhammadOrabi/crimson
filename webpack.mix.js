let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/dashboard/js/app.js', 'public/dashboard/js')
    .sass('resources/assets/dashboard/sass/app.scss', 'public/dashboard/css');

mix.js('resources/assets/buefy/js/app.js', 'public/buefy/js')
    .sass('resources/assets/buefy/sass/app.scss', 'public/buefy/css');

let tailwindcss = require('tailwindcss');

mix.sass('resources/assets/tailwindcss/sass/app.sass', 'public/tailwindcss').options({
    processCssUrls: false,
    postCss: [tailwindcss('resources/assets/tailwindcss/js/tailwind.js')],
});
