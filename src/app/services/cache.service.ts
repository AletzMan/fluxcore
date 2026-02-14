
import { AxiosRequestConfig } from "axios";

class CacheService {
    private cache = new Map<string, { data: any; expiry: number }>();

    constructor() { }

    async get(key: string) {
        const item = this.cache.get(key);
        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.cache.delete(key);
            return null;
        }

        return item.data;
    }

    set(key: string, data: any, ttlSeconds: number = 60) {
        this.cache.set(key, {
            data,
            expiry: Date.now() + ttlSeconds * 1000,
        });
    }

    clear() {
        this.cache.clear();
    }

    invalidateKeysByPattern(pattern: string) {
        for (const key of this.cache.keys()) {
            if (key.includes(pattern)) {
                this.cache.delete(key);
            }
        }
    }

    generateKey(config: AxiosRequestConfig): string {
        const { url, method, params, data } = config;
        const stableParams = params ? this.sortObject(params) : {};
        const stableData = data ? this.sortObject(data) : {};

        return `${method}:${url}:${JSON.stringify(stableParams)}:${JSON.stringify(stableData)}`;
    }

    private sortObject(obj: any): any {
        if (obj === null || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(this.sortObject.bind(this));

        return Object.keys(obj)
            .sort()
            .reduce((result: any, key) => {
                result[key] = this.sortObject(obj[key]);
                return result;
            }, {});
    }
}

const globalForCache = global as unknown as { cacheService: CacheService };

export const cacheService = globalForCache.cacheService || new CacheService();

if (process.env.NODE_ENV !== 'production') globalForCache.cacheService = cacheService;
