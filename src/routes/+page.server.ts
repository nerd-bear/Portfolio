import { cached } from '../lib/server/cache.ts';

export const load = async () => {
    const data = await cached('homepage-data', 60_000, async () => {
        return {
            time: Date.now()
        };
    });

    return data;
};