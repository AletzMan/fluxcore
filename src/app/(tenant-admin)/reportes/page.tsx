import { Breadcrumb } from "lambda-ui-components";

export default function ReportsPage() {
    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Reportes", href: "/reportes" }
                ]}
            />
            <h1 style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-2xl)' }}>Reportes y Analíticas</h1>
            <p style={{ color: 'var(--foreground-secondary-color)' }}>
                Visualiza el rendimiento y datos estadísticos de ventas y otras métricas clave.
            </p>
        </div>
    );
}
