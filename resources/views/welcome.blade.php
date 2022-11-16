

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Art of feel</title>
    <!-- Styles -->
    <link rel="icon" href="{{ URL::asset('/images/image2vector.svg') }}" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('/css/app.css')  }}">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body style="background-color:black; margin: 0px">
    <div id="cisco" >
    </div>
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>