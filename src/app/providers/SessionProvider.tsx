import { usePathname, useRouter } from "next/navigation";
import { authService } from "../services/api/auth.service";
import { apiFluxCore } from "../services/api/axios-instance";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthStore();

    useEffect(() => {
        // Solo verificar una vez al montar el componente
        restoreSessionIfNeeded();
    }, []);

    const restoreSessionIfNeeded = async () => {
        // Rutas públicas que no requieren autenticación
        const publicRoutes = ['/login', '/register'];
        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
        const isLandingPage = pathname === '/';

        // Si estamos en una ruta pública, no verificar sesión
        if (isPublicRoute || isLandingPage) {
            useAuthStore.getState().setLoading(false);
            return;
        }

        try {
            // Intentar restaurar sesión
            const restored = await authService.restoreSession();

        } catch (error) {
            console.error('Error restoring session:', error);
        }
    };

    // Mostrar loading mientras verificamos
    if (isLoading) {
        return (
            <div className="">
                <div className=" ">
                    <div className=""></div>
                    <p className=" ">Cargando...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}