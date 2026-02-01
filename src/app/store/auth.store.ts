
import { AuthUser } from "@/typesAPI/auth.types";
import { create } from "zustand";

interface AuthState {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;


    setAuth: (user: AuthUser, accessToken: string) => void;
    setUser: (user: AuthUser) => void;
    setAccessToken: (token: string) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,

    setAuth: (user, accessToken) =>
        set({
            user,
            accessToken,
            isAuthenticated: true,
            isLoading: false,
        }),

    setUser: (user) =>
        set({
            user,
        }),

    setAccessToken: (accessToken) =>
        set({
            accessToken,
        }),

    setLoading: (isLoading) =>
        set({
            isLoading,
        }),

    logout: () =>
        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
        }),
}));