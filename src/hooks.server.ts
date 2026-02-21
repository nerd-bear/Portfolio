import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    const path = event.url.pathname;

    if (event.url.pathname === '/') {
        response.headers.set('Cache-Control', 'public, max-age=300');
    }

    if (path.startsWith('/') && /\.(png|jpg|jpeg|webp|svg|ico|css|js|woff2)$/.test(path)) {
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    return response;
};