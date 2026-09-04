<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Suspended | {{ config('app.name') }}</title>
    {{-- style --}}
    @vite('resources/css/app.css')
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Custom modal handling */
        #appeal-modal {
            display: none;
        }

        #appeal-modal.active {
            display: flex;
        }

        #modal-form {
            display: block;
        }

        #modal-success {
            display: none;
        }

        .submitting #modal-form {
            opacity: 0.5;
            pointer-events: none;
        }

        .success #modal-form {
            display: none;
        }

        .success #modal-success {
            display: block;
        }
    </style>
</head>

<body
    class="min-h-screen bg-white text-slate-800 font-sans antialiased flex items-center justify-center p-4 sm:p-8 selection:bg-slate-200 selection:text-slate-900">
    <div class="w-full max-w-md bg-white rounded-3xl overflow-hidden text-center relative pt-8 pb-6 px-6 sm:px-8">


        <!-- Icon -->
        <div class="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6 mt-6">
            <i data-lucide="lock" class="w-8 h-8"></i>
        </div>

        <!-- Header -->
        <h1 class="text-2xl font-bold text-slate-900 mb-2">Account Suspended</h1>
        <p class="text-slate-500 text-sm mb-6 leading-relaxed">
            We detected activity on <strong class="text-slate-800 font-medium">{{ Auth::user()->email }}</strong> that
            violates our Acceptable Use Policy. Access is restricted.
        </p>

        <!-- Details -->
        <div class="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/80 mb-8 space-y-2 text-sm text-left">
            <div class="flex justify-between items-center">
                <span class="text-slate-500">Reason</span>
                <span class="font-medium text-slate-700 text-right">
                    {{ $message }}
                </span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-slate-500">Date</span>
                <span class="font-medium text-slate-700 text-right">
                    {{ $date }}
                </span>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col space-y-3">
            <a href="{{ route('ux.contact.index') }}"
                class="w-full py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 flex items-center justify-center">
                Contact Support
            </a>
            <a href="{{ route('logout') }}"
                class="w-full py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center">
                <i data-lucide="log-out" class="w-4 h-4 mr-2"></i> Sign out
            </a>
        </div>
    </div>

    <script>
        lucide.createIcons();
    </script>
</body>

</html>