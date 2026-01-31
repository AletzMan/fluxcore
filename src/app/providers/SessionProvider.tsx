import { apiFluxCore } from "../services/api/axios-instance";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
    const { setAuth, isLoading, setLoading } = useAuthStore();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const { data } = await apiFluxCore.get("/auth/refresh-token");
                setAuth(data.user, data.accessToken);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        initializeAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}