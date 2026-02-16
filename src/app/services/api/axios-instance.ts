import axios, { AxiosRequestConfig } from "axios";
import { ErrorMessages } from "../../../lib/errors/message-errors";


export const apiFluxCore = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        let errorCode = "UNKNOWN_ERROR";
        let message = "Error inesperado.";
        console.log("error.response.data", error.response?.data);
        console.log("error", error.response?.data.errors);

        // 1. DETECCIÓN DE SERVIDOR CAÍDO (.NET ) 🔌 
        // ECONNREFUSED significa que nadie escucha en ese puerto (Backend apagado)
        // ETIMEDOUT significa que el servidor no respondió a tiempo
        // ERR_NETWORK significa que hubo un error de red
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT' || error.code === 'ERR_NETWORK') {
            errorCode = "NETWORK_ERROR";
            message = ErrorMessages.NETWORK_ERROR;
        }
        // 2. Errores HTTP estándar (404, 500, 401)
        else if (error.response) {
            const status = error.response.status;
            if (status === 400) errorCode = "BAD_REQUEST";
            if (status === 401) errorCode = "AUTH_USER_NOT_AUTHENTICATED";
            if (status === 429) errorCode = "RATE_LIMIT";
            if (status === 500) errorCode = "SERVER_ERROR";

            if (status === 422) {
                const errors = error.response.data.errors;
                message = errors[0].message;
            }
            message = ErrorMessages[errorCode] || message;
        }

        return {
            data: null,
            success: false,
            errorCode,
            message,
            timestamp: new Date()
        };
    }

    return {
        data: null,
        success: false,
        errorCode: "INTERNAL_ERROR",
        message: "Ocurrió un error inesperado.",
        timestamp: new Date()
    };
};

export const apiFluxCoreGet = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
        const response = await apiFluxCore.get<T>(url, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCorePost = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        const response = await apiFluxCore.post<T>(url, data, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCorePut = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        const response = await apiFluxCore.put<T>(url, data, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

import { cacheService } from "../cache.service";

export const apiFluxCoreServer = async () => {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();

    const token = cookieStore.get('accessToken')?.value;

    const instance = axios.create({
        ...apiFluxCore.defaults,
        headers: {
            ...apiFluxCore.defaults.headers,
            Authorization: token ? `Bearer ${token}` : '',
            Cookie: cookieStore.toString()
        }
    });

    // Request Interceptor for Caching
    instance.interceptors.request.use(async (config) => {
        if ((config as any).cache) {
            const key = cacheService.generateKey(config);
            const cachedData = await cacheService.get(key);

            if (cachedData) {
                // Return a special error object to be caught by the response interceptor
                throw {
                    __isCache: true,
                    data: cachedData,
                    config,
                    headers: config.headers,
                };
            }
        }
        return config;
    });

    // Response Interceptor for Caching
    instance.interceptors.response.use(
        (response) => {
            if ((response.config as any).cache) {
                const key = cacheService.generateKey(response.config);
                const ttl = (response.config as any).ttl || 60; // Default 60s
                cacheService.set(key, response.data, ttl);
            }
            return response;
        },
        async (error) => {
            // Check if it's our standard cache hit "error"
            if (error && error.__isCache) {
                // Return a mock AxiosResponse
                return Promise.resolve({
                    data: error.data,
                    status: 200,
                    statusText: 'OK (Cached)',
                    headers: error.headers,
                    config: error.config,
                });
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export const apiFluxCoreServerGet = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
        const api = await apiFluxCoreServer();
        const response = await api.get<T>(url, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCoreServerPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        const api = await apiFluxCoreServer();
        const response = await api.post<T>(url, data, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCoreServerPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        const api = await apiFluxCoreServer();
        const response = await api.put<T>(url, data, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};