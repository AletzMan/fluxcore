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
        try {
            setIsLoading(true);
            setError(null);

            const response = await authService.login(credentials);
            console.log(response);
            router.push('/admin');
        } catch (err: any) {
            const errorCode = err.response?.data?.code;
            const message = ErrorMessages[errorCode];
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setIsLoading(true);
            setError(null);

            await authService.register(data);

            router.push('/dashboard');
        } catch (err: any) {
            const errorCode = err.response?.data?.code;
            const message = ErrorMessages[errorCode];
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
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