// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: 'resources/js/app.jsx',
//             refresh: true,
//         }),
//         react(),
//     ],
// });

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // This allows access from your local network
        port: 5173, // You can change this to any port you prefer
        hmr: {
            host: 'localhost'
        }
    },
});
