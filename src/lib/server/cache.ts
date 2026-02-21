const cache = new Map<
    string,
    { value: unknown; expires: number }
>();

export async function cached<T>(
    key: string,
    ttlMs: number,
    fn: () => Promise<T>
): Promise<T> {
    const now = Date.now();
    const hit = cache.get(key);

    if (hit && hit.expires > now) {
        return hit.value as T;
    }

    const value = await fn();

    cache.set(key, {
        value,
        expires: now + ttlMs
    });

    return value;
}