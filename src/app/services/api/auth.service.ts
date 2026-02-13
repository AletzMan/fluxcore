
import { useAuthStore } from "@/app/store/auth.store";
import { apiFluxCoreGet, apiFluxCorePost } from "./axios-instance";
import { User } from "@/typesModels/User";
import { LoginCredentials, LoginResponse, RegisterData } from "@/typesAPI/auth.types";
import { ApiResponse } from "@/typesAPI/common.types";
import axios from "axios";
///
class AuthService {

    private getStore() {
        return useAuthStore.getState();
    }

    async login(credentials: LoginCredentials): Promise<LoginResponse | undefined> {
        const response = await apiFluxCorePost<LoginResponse>("/auth/login", credentials);

        if (response && response.success && response.data) {
            this.getStore().setAuth(response.data.user, response.data.token);
        }

        return response as LoginResponse;
    }

    async register(data: RegisterData): Promise<LoginResponse | undefined> {
        const response = await apiFluxCorePost<LoginResponse>("/auth/register", data);

        if (response && response.success && response.data) {
            this.getStore().setAuth(response.data.user, response.data.token);
        }

        return response as LoginResponse;
    }

    async refreshToken(): Promise<string | undefined> {
        const response = await apiFluxCorePost<ApiResponse<{ accessToken: string }>>('/auth/refresh-token');

        if (response && response.success && response.data) {
            const { accessToken } = response.data;
            this.getStore().setAccessToken(accessToken);
            return accessToken;
        }

        return undefined;
    }

    async logout(): Promise<void> {
        try {
            await apiFluxCorePost("/auth/logout");
        } catch (error) {
            console.error(error);
        } finally {
            this.getStore().logout();
        }
    }

    async verifySession(): Promise<User | null> {
        const response = await apiFluxCoreGet<ApiResponse<{ user: User; accessToken?: string }>>('/auth/me');

        if (response && response.success && response.data) {
            const result = response.data;
            const token = result.accessToken || this.getStore().accessToken;

            this.getStore().setAuth(result.user, token || "");
            return result.user;
        }

        return null;
    }

    async restoreSession(): Promise<boolean> {
        try {
            this.getStore().setLoading(true);
            const user = await this.verifySession();

            return !!user;
        } catch (error) {
            this.getStore().logout();

            return false;
        } finally {
            this.getStore().setLoading(false);
        }
    }
}

export const authService = new AuthService();