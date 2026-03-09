import { Suspense } from "react";
import Link from "next/link";
import { Button } from "lambda-ui-components";
import { ArrowLeft } from "lucide-react";
import { LogoFluxCoreLarge } from "@/app/components/logos/LogoFluxCoreLarge";
import { planService } from "@/app/services/api/plan.service";
import { Plan } from "@/typesModels/Plan";
import { RegisterClient } from "./components/RegisterClient";
import styles from "./page.module.scss";

export default async function RegisterPage() {
    const plansResponse = await planService.getActivePlans();
    const plans = (plansResponse?.data || []).sort((a: Plan, b: Plan) => a.monthlyPrice - b.monthlyPrice);

    return (
        <div className={styles.page}>
            <nav className={styles.navbar}>
                <LogoFluxCoreLarge width={28} height={28} />
                <div className={styles.navLinks}>
                    <span style={{ color: "var(--foreground-secondary-color)" }}>¿Ya tienes cuenta?</span>
                    <Button color="primary" variant="outline" size="small">
                        <Link href="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                            Iniciar sesión
                        </Link>
                    </Button>
                </div>
            </nav>

            <main className={styles.content}>
                <Suspense fallback={<div>Cargando opciones...</div>}>
                    <RegisterClient plans={plans} />
                </Suspense>
            </main>
        </div>
    );
}
