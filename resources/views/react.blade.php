<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Time Classics</title>
        <!-- Bitmovin -->
        <script src="//cdn.bitmovin.com/player/web/8/bitmovinplayer.js"></script>

        <!-- Fonts -->
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
        <div>
            <div id="root"></div>
        </div>
        <script src="/js/app.js"></script>
        <!-- <script src="/js/dist/app.js"></script>

        <script src="/js/dist/vendors.js"></script> -->
        @if(config('app.env') == 'local')
            <script src="http://localhost:35729/livereload.js"></script>
        @endif
    </body>
</html>
