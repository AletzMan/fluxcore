
import { useAuthStore } from "@/app/store/auth.store";
import { apiFluxCore } from "../api/axios-instance";

apiFluxCore.interceptors.request.use(
    (config) => {
        const { accessToken } = useAuthStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiFluxCore.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await apiFluxCore.post("/auth/refresh-token",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = data.accessToken;
                useAuthStore.getState().setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiFluxCore(originalRequest);
            } catch (error) {
                useAuthStore.getState().logout();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
