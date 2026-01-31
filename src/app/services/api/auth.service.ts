
import { useAuthStore } from "@/app/store/auth.store";
import { apiFluxCore } from "./axios-instance";
import { User } from "@/types/models/User";
import { LoginResponse, RegisterData } from "@/types/api/auth.types";

///
class AuthService {

    async login(username: string, password: string): Promise<LoginResponse> {
        const response = await apiFluxCore.post<LoginResponse>("/auth/login", { username, password });
        const { user, accessToken } = response.data;

        useAuthStore.getState().setAuth(user, accessToken);
        return response.data;
    }

    async register(data: RegisterData): Promise<LoginResponse> {
        const response = await apiFluxCore.post<LoginResponse>("/auth/register", data);
        const { user, accessToken } = response.data;

        useAuthStore.getState().setAuth(user, accessToken);
        return response.data;
    }

    async refreshToken(): Promise<string> {
        const response = await apiFluxCore.post<{ accessToken: string }>('/auth/refresh-token');
        const { accessToken } = response.data;

        useAuthStore.getState().setAccessToken(accessToken);
        return accessToken;
    }

    async logout(): Promise<void> {
        try {
            await apiFluxCore.post("/auth/logout");
        } catch (error) {
            console.error(error);
        } finally {
            useAuthStore.getState().logout();
        }
    }

    async verifySession(): Promise<User | null> {
        try {
            const response = await apiFluxCore.get<{ user: User; accessToken?: string }>('/auth/me');
            const { user, accessToken } = response.data;

            if (accessToken) {
                useAuthStore.getState().setAccessToken(accessToken);
            }

            const currentToken = useAuthStore.getState().accessToken || accessToken;
            useAuthStore.getState().setAuth(user, currentToken!);

            return user;
        } catch (error) {
            return null;
        }
    }

    async restoreSession(): Promise<boolean> {
        try {
            useAuthStore.getState().setLoading(true);
            const user = await this.verifySession();

            return !!user;
        } catch (error) {
            useAuthStore.getState().logout();

            return false;
        } finally {
            useAuthStore.getState().setLoading(false);
        }
    }
}