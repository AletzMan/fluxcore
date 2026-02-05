
import { useAuthStore } from "@/app/store/auth.store";
import { apiFluxCore } from "./axios-instance";
import { User } from "@/typesModels/User";
import { LoginCredentials, LoginResponse, RegisterData } from "@/typesAPI/auth.types";
import { ApiResponse } from "@/typesAPI/common.types";
///
class AuthService {

    private getStore() {
        return useAuthStore.getState();
    }

    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        const response = await apiFluxCore.post<LoginResponse>("/auth/login", credentials);
        const { data } = response.data;
        if (data) {
            this.getStore().setAuth(data!.user, data!.token);
        }
        return response.data;
    }

    async register(data: RegisterData): Promise<LoginResponse> {
        const response = await apiFluxCore.post<LoginResponse>("/auth/register", data);
        const { data: dataResponse } = response.data;

        this.getStore().setAuth(dataResponse!.user!, dataResponse!.token!);
        return response.data;
    }

    async refreshToken(): Promise<string> {
        const response = await apiFluxCore.post<{ accessToken: string }>('/auth/refresh-token');
        const { accessToken } = response.data;

        this.getStore().setAccessToken(accessToken);
        return accessToken;
    }

    async logout(): Promise<void> {
        try {
            await apiFluxCore.post("/auth/logout");
        } catch (error) {
            console.error(error);
        } finally {
            this.getStore().logout();
        }
    }

    async verifySession(): Promise<User | null> {
        try {
            const response = await apiFluxCore.get<ApiResponse<{ user: User; accessToken?: string }>>('/auth/me');
            const result = response.data.data;

            if (!result || !result.user) return null;

            // Si el backend envió un nuevo token en el JSON, lo guardamos.
            // Si no, confiamos en la cookie que ya viaja en las cabeceras.
            const token = result.accessToken || this.getStore().accessToken;

            this.getStore().setAuth(result.user, token || "");
            return result.user;
        } catch (error) {
            return null;
        }
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