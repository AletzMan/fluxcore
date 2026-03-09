import { cacheService } from "../cache.service";
import axios, { AxiosRequestConfig } from "axios";
import { ErrorMessages } from "../../../lib/errors/message-errors";


export const apiFluxCore = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

const handleAxiosError = (error: unknown) => {
    // Re-lanzar errores internos de Next.js (redirect, notFound).
    // Estos NO son errores HTTP: son excepciones especiales que Next.js
    // usa para interrumpir el render. Si las atrapamos y las retornamos
    // como errores normales, el redirect() nunca se ejecuta.
    if (
        error &&
        typeof error === 'object' &&
        'digest' in error &&
        typeof (error as any).digest === 'string' &&
        ((error as any).digest.startsWith('NEXT_REDIRECT') ||
            (error as any).digest.startsWith('NEXT_NOT_FOUND'))
    ) {
        throw error;
    }

    if (axios.isAxiosError(error)) {
        console.log("error", error);
        let errorCode = error.response?.data?.code || "UNKNOWN_ERROR";
        console.log("errorCode", errorCode);
        let message = ErrorMessages[errorCode] || "Error inesperado.";
        console.log("error.response.data", error.response);
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
            if (status === 400 && error.response.data.code !== "IMAGE_NOT_UPLOADED") errorCode = "BAD_REQUEST"; 
            if (status === 429) errorCode = "RATE_LIMIT";
            if (status === 500) errorCode = "SERVER_ERROR";
            if (status === 503) errorCode = "SERVICE_UNAVAILABLE";

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

export const apiFluxCorePatch = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        const response = await apiFluxCore.patch<T>(url, data, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCoreDelete = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
        const response = await apiFluxCore.delete<T>(url, config);
        return response.data;
    } catch (error) {
        return handleAxiosError(error);
    }
};


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

    // Response Interceptor for Caching only (NO 401 handling here)
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

/**
 * Refreshes the access token using the refresh token cookie.
 * Sets the new tokens directly in cookies at the Server Action level
 * so that Set-Cookie headers are properly sent back to the browser.
 * Returns the new access token or null if refresh failed.
 */
async function refreshTokenOnServer(): Promise<string | null> {
    try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();

        const currentToken = cookieStore.get('accessToken')?.value;
        const refreshHeaders: Record<string, string> = {
            Cookie: cookieStore.toString()
        };
        if (currentToken) {
            refreshHeaders['Authorization'] = `Bearer ${currentToken}`;
        }

        console.log("[refreshTokenOnServer] Attempting refresh...");

        const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}auth/refresh-token`,
            {},
            { headers: refreshHeaders }
        );

        console.log("refreshResponse.data", refreshResponse.data.data.token);  
        const newAccessToken = refreshResponse.data?.data?.token;

        if (!newAccessToken) {
            console.error("[refreshTokenOnServer] No accessToken in refresh response");
            return null;
        }

        console.log("[refreshTokenOnServer] Got new accessToken, updating cookies...");

        // Intentamos persistir las cookies. Esto SOLO funciona en Server Actions
        // y Route Handlers. En Server Components (render de páginas) fallará,
        // pero el token nuevo se retorna igualmente para usarse en el retry.
        try {
            cookieStore.set('accessToken', newAccessToken, {
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
            });

            // Also update refreshToken if the backend rotated it
            const setCookieHeaders = refreshResponse.headers['set-cookie'];
            if (setCookieHeaders && setCookieHeaders.length) {
                for (const cookieStr of setCookieHeaders) {
                    if (cookieStr.includes('refreshToken=')) {
                        const rtMatch = cookieStr.match(/refreshToken=([^;]+)/);
                        if (rtMatch) {
                            cookieStore.set('refreshToken', rtMatch[1], {
                                secure: process.env.NODE_ENV === 'production',
                                httpOnly: true,
                                path: '/',
                                sameSite: 'lax',
                            });
                            console.log("[refreshTokenOnServer] refreshToken cookie updated");
                        }
                    }
                }
            }
            console.log("[refreshTokenOnServer] Cookies updated successfully");
        } catch (cookieError) {
            // En Server Components no se pueden modificar cookies.
            // El token nuevo se retorna de todas formas para el retry inmediato.
            console.warn("[refreshTokenOnServer] Could not persist cookies (Server Component context). Token will be used for retry only.");
        }

        return newAccessToken;
    } catch (error: any) {
        console.error("[refreshTokenOnServer] Failed:", error.response?.data || error.message);
        // No podemos borrar cookies aquí: cookies().delete() solo funciona en
        // Server Actions y Route Handlers, NO en Server Components.
        // El borrado se hace en /api/auth/clear-session vía redirect().
        return null;
    }
}

/**
 * Wraps a server API call with automatic 401 retry.
 * If the call fails with 401, refreshes the token and retries ONCE.
 */
async function withTokenRefresh<T>(
    apiFn: (instance: ReturnType<typeof axios.create>) => Promise<T>
): Promise<T> {
    try {
        const api = await apiFluxCoreServer();
        return await apiFn(api);
    } catch (error) {
        // If it's a 401 error, try refreshing the token and retrying
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log("[withTokenRefresh] 401 detected, refreshing token...");

            const newToken = await refreshTokenOnServer();
            if (newToken) {
                console.log("[withTokenRefresh] Token refreshed, retrying request...");

                // Create a fresh instance with the new token
                const { cookies } = await import("next/headers");
                const freshCookieStore = await cookies();

                const retryInstance = axios.create({
                    ...apiFluxCore.defaults,
                    headers: {
                        ...apiFluxCore.defaults.headers,
                        Authorization: `Bearer ${newToken}`,
                        Cookie: freshCookieStore.toString()
                    }
                });

                return await apiFn(retryInstance);
            }

            // El refresh falló: las cookies no se pueden borrar en un Server Component.
            // Usamos redirect() al Route Handler que sí puede hacerlo.
            // redirect() lanza una excepción especial de Next.js que interrumpe
            // el render y redirige al navegador — no necesita return.
            console.warn("[withTokenRefresh] Refresh failed. Redirecting to clear-session...");
            const { redirect } = await import("next/navigation");
            redirect('/api/auth/clear-session?callbackUrl=/login');
        }
        throw error;
    }
}

export const apiFluxCoreServerGet = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
        return await withTokenRefresh(async (api) => {
            const response = await api.get<T>(url, config);
            console.log("apiFluxCoreServerGet response.data", response.data);
            return response.data;
        });
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCoreServerPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        return await withTokenRefresh(async (api) => {
            const response = await api.post<T>(url, data, config);
            return response.data;
        });
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCoreServerPut = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        return await withTokenRefresh(async (api) => {
            const response = await api.put<T>(url, data, config);
            return response.data;
        });
    } catch (error) {
        return handleAxiosError(error);
    }
};

export const apiFluxCoreServerPatch = async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
        return await withTokenRefresh(async (api) => {
            const response = await api.patch<T>(url, data, config);
            return response.data;
        });
    } catch (error) {
        return handleAxiosError(error);
    }
};
    