"use client";

import styles from "./not-found.module.scss";
import { Button } from "lambda-ui-components";
import { useRouter } from "next/navigation";
import { getHomeRouteForRole } from "../lib/utils/auth-utils";
import { LogoFluxCore } from "./components/logos/LogoFluxCore";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    const { user } = useAuth();
    const router = useRouter();
    const homeRoute = getHomeRouteForRole(user?.role || 'CASHIER');

    return (
        <div className={styles.scene}>
            {/* Perspective grid floor */}
            <div className={styles.gridFloor} />

            {/* Floating particles */}
            <div className={styles.particles}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className={styles.particle} style={{
                        '--x': `${Math.random() * 100}%`,
                        '--y': `${Math.random() * 100}%`,
                        '--size': `${2 + Math.random() * 4}px`,
                        '--duration': `${3 + Math.random() * 6}s`,
                        '--delay': `${Math.random() * 5}s`,
                    } as React.CSSProperties} />
                ))}
            </div>

            {/* Main content */}
            <div className={styles.content}>
                <div className={styles.glitchWrapper}>
                    <h1 className={styles.errorCode} data-text="404">404</h1>
                </div>

                <div className={styles.divider}>
                    <span className={styles.dividerLine} />
                    <LogoFluxCore width={32} height={32} />
                    <span className={styles.dividerLine} />
                </div>

                <div className={styles.info}>
                    <h2>Ruta no encontrada</h2>
                    <p>
                        Esta página se ha perdido en el flujo de datos.
                        Verifica la URL o regresa a territorio conocido.
                    </p>
                </div>

                <div className={styles.actions}>
                    <Button
                        color="primary"
                        size="large"
                        onClick={() => router.push(homeRoute)}
                    >
                        <span className={styles.btnContent}>
                            <ArrowLeft size={18} />
                            Volver a {user?.role === 'CASHIER' ? 'Ventas' : 'mi Panel'}
                        </span>
                    </Button>
                    <Button
                        color="neutral"
                        size="large"
                        variant="soft"
                        onClick={() => router.push('/')}
                    >
                        <span className={styles.btnContent}>
                            <Home size={18} />
                            Ir al inicio
                        </span>
                    </Button>
                </div>
            </div>

            {/* Scan line effect */}
            <div className={styles.scanline} />
        </div>
    );
}
