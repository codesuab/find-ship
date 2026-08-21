import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Find Ship';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#f4671d',
    },
});
