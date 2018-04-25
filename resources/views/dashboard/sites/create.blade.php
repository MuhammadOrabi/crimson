@extends('dashboard.layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Create Website') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('dashboard.sites.store') }}">
                        @csrf
                        <input type="hidden" name="template_id" value="{{ $template->id }}">
                        <div class="form-group row">
                            <label for="domain" class="col-sm-4 col-form-label text-md-right">{{ __('Domain') }}</label>

                            <div class="col-md-6">
                                <input id="domain" type="text" class="form-control{{ $errors->has('domain') ? ' is-invalid' : '' }}" name="domain" value="{{ old('domain') }}" required autofocus>

                                @if ($errors->has('domain'))
                                    <span class="invalid-feedback">
                                        <strong>{{ $errors->first('domain') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Create') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@stop