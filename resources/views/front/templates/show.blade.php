@extends('front.layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ $template->name }}</div>

                <div class="card-body">
                    <article>
                        <div class="body">{{ $template->tags->first()->tag }}</div>
                        <a href="{{ $template->createPath() }}">{{ __('Use this template!') }}</a>    
                    </article>
                </div>
            </div>
        </div>
    </div>
    @foreach($template->sites as $site)
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <div class="body">{{ $site->name }}</div>
                    </div>
                </div>
            </div>
        </div>
    @endforeach
</div>
@stop
