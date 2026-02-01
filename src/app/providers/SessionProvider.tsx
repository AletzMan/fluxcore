"use client";

import { usePathname } from "next/navigation";
import { authService } from "../services/api/auth.service";
import { useAuthStore } from "../store/auth.store";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, isLoading, setLoading } = useAuthStore();

    // Evita que el efecto se ejecute dos veces en Desarrollo (Strict Mode)
    const initialized = useRef(false);

    useEffect(() => {
        const hydrate = async () => {
            if (initialized.current) return;
            initialized.current = true;

            const authRoutes = ['/login', '/register', '/forgot-password'];
            const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
            const isLandingPage = pathname === '/';

            // 1. Si es ruta pública, liberamos el loader de inmediato
            if (isAuthRoute || isLandingPage) {
                setLoading(false);
                // Intentamos cargar al usuario en "silencio" por si ya tiene sesión
                authService.verifySession().catch(() => null);
                return;
            }

            // 2. Si es ruta privada, esperamos la verificación
            try {
                await authService.restoreSession();
            } catch (error) {
                console.error('Error durante la hidratación:', error);
            } finally {
                // 3. Pase lo que pase, apagamos el loader al final
                setLoading(false);
            }
        };

        hydrate();
    }, [pathname, setLoading]);

    // 4. Lógica de renderizado: 
    // Solo bloqueamos si está cargando Y no tenemos un usuario en el store.
    /*if (isLoading && !user) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-sm font-medium animate-pulse text-muted-foreground">
                        Sincronizando RetailFlow...
                    </p>
                </div>
            </div>
        );
    }*/

    return <>{children}</>;
}