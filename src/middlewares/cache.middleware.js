import { redis } from '../config/redis.js';

export const cacheResponse = (keyGenerator, ttl) => {
    return async (req, res, next) => {
        try {
            const key =
                typeof keyGenerator === 'function'
                    ? await keyGenerator(req)
                    : keyGenerator;

            const cachedData = await redis.get(key);

            if (cachedData !== null) {
                console.log(`CACHED DATA for ${key}`);
                return res.status(200).json(cachedData);
            }

            /* Сохраняет оригинальный метод res.json, привязанный к объекту res */
            const originalJson = res.json.bind(res);

            res.json = (data) => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    redis
                        .set(key, data, { ex: ttl })
                        .then(() => {
                            console.log(`CACHE SAVED: ${key}, TTL: ${ttl}s`);
                        })
                        .catch((error) => {
                            console.log('Redis cache error:', error);
                        });
                }
                return originalJson(data);
            };
            next();
        } catch (e) {
            console.error('Redis error:', error);
            next();
        }
    };
};
