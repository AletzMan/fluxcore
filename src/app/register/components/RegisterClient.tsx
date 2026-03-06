"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Plan } from "@/typesModels/Plan";
import { PricingSection } from "@/app/components/landing/PricingSection";
import { RegisterForm } from "./RegisterForm/RegisterForm";
import styles from "../page.module.scss";

interface RegisterClientProps {
    plans: Plan[];
}

export function RegisterClient({ plans }: RegisterClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const planIdStr = searchParams.get('planId');
    const billingCycle = searchParams.get('billing') || 'monthly';

    const selectedPlanId = planIdStr ? parseInt(planIdStr, 10) : null;
    const selectedPlan = plans.find(p => p.id === selectedPlanId);

    if (!selectedPlan) {
        // Mostrar selección de plan si no viene pre-seleccionado
        return (
            <div className={styles.registerContainer}>
                <div className={styles.header}>
                    <h1>Elige tu Plan</h1>
                    <p>Para comenzar con tu registro, selecciona el plan que mejor se adapte a tus necesidades.</p>
                </div>
                {/* 
                  PricingSection internamente usa Link a /register?planId=X&billing=Y
                  por lo que al hacer clic la página se recargará con el parámetro
                */}
                <PricingSection plans={plans} />
            </div>
        );
    }

    // Si ya existe un plan seleccionado
    return (
        <div className={`${styles.registerContainer} ${styles.narrow}`}>
            <div className={styles.header}>
                <h1>Crea tu cuenta</h1>
                <p>Estás a punto de iniciar con el plan <strong>{selectedPlan.name}</strong> en ciclo <strong>{billingCycle === 'yearly' ? 'Anual' : 'Mensual'}</strong>.</p>
                <div style={{ marginTop: 'var(--spacing-md)' }}>
                    <button
                        style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => router.push('/register')}
                    >
                        Cambiar plan
                    </button>
                </div>
            </div>

            {/* Componente del Formulario */}
            <RegisterForm selectedPlan={selectedPlan} billingCycle={billingCycle} />
        </div>
    );
}
