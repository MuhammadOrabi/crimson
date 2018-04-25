@extends('front.layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Templates') }}</div>

                <div class="card-body">
                    @foreach($templates as $template)
                        <article>
                            <h4>{{ $template->name }}</h4>
                            <div class="body">{{ @$template->tags->first()->tag }}</div>
                            <a href="{{$template->path()}}">Check it out</a>    
                        </article>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@stop