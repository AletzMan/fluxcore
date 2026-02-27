import { useAuthStore } from '@/app/store/auth.store';
import { authService } from '@/app/services/api/auth.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { LoginCredentials, RegisterData } from '@/typesAPI/auth.types';
import { ErrorMessages } from '../lib/errors/message-errors';

export function useAuth() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user, isAuthenticated, logout: logoutStore, setAuth } = useAuthStore();

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);

        const response = await authService.login(credentials);

        if (response && response.success) {
            router.push('/admin/dashboard');
        } else {
            setError(response?.message || "Ocurrió un error al iniciar sesión");
        }
        setIsLoading(false);
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        setError(null);

        const response = await authService.register(data);

        if (response && response.success) {
            router.push('/admin/dashboard');
        } else {
            setError(response?.message || "Ocurrió un error en el registro");
        }
        setIsLoading(false);
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await authService.logout();
            router.push('/login');
        } catch (err) {
            console.error('Error during logout:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const verifyAuth = async () => {
        try {
            const isValid = await authService.verifySession();
            if (!isValid) {
                logoutStore();
                router.push('/login');
            }
        } catch (err) {
            logoutStore();
            router.push('/login');
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        verifyAuth,
    };
}