"use client";

import styles from "./not-found.module.scss";
import { Button } from "lambda-ui-components";
import { useRouter } from "next/navigation";
import { getHomeRouteForRole } from "../lib/utils/auth-utils";
import { LogoFluxCore } from "./components/logos/LogoFluxCore";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, ArrowLeft, Home } from "lucide-react";
import { motion } from "motion/react";

export default function NotFound() {
    const { user } = useAuth();
    const router = useRouter();
    const homeRoute = getHomeRouteForRole(user?.role || 'CASHIER');

    return (
        <div className={styles.container}>
            {/* Background glowing effects */}
            <div className={styles.glowCyan} />
            <div className={styles.glowSky} />

            <motion.div
                className={styles.card}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    className={styles.logoWrapper}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <LogoFluxCore width={48} height={48} />
                </motion.div>

                <div className={styles.content}>
                    <motion.div
                        className={styles.numberWrapper}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 100 }}
                    >
                        <h1 className={styles.errorNumber}>404</h1>
                        <Sparkles className={styles.sparkleIcon} size={40} />
                    </motion.div>

                    <motion.div
                        className={styles.textWrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2>¿Te perdiste en el flujo?</h2>
                        <p>
                            La página que buscas no existe o fue movida.
                            Pero no te preocupes, el corazón de tu negocio sigue latiendo.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button
                            color="primary"
                            size="large"
                            radius="large"
                            onClick={() => router.push(homeRoute)}
                            block
                        >
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
                                <ArrowLeft size={18} />
                                Volver a {user?.role === 'CASHIER' ? 'Ventas' : 'mi Panel'}
                            </span>
                        </Button>
                        <Button
                            color="neutral"
                            size="large"
                            radius="large"
                            variant="outline"
                            onClick={() => router.push('/')}
                            block
                        >
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
                                <Home size={18} />
                                Ir a inicio
                            </span>
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
