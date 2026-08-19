<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }} - 404 Not Found</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    {{-- style --}}
    @vite('resources/css/app.css')
</head>

<body class='w-full h-screen flex flex-col items-center justify-center container'>
    <div class='w-100'>
        <img src="{{ asset('media/system/404.svg') }}" class='w-full h-full' />
    </div>
    <h2 class='max-w-150 mx-auto text-xl md:text-2xl font-semibold text-foreground text-center'>The requested URL was not found on this server.You can try the following links.</h2>
    <div class='flex items-center gap-10 mt-10'>
         <a href="{{ route('home') }}" class="text-xl font-semibold text-primary">Home Page</a>
         <a href="{{ route('ux.contact.index') }}" class="text-xl font-semibold text-primary">Contact Us</a>
    </div>
</body>

</html>