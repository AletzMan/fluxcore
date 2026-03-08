import { Breadcrumb } from "lambda-ui-components";

export default function DashboardPage() {
    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Dashboard", href: "/dashboard" }
                ]}
            />
            <h1 style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-2xl)' }}>Dashboard</h1>
            <p style={{ color: 'var(--foreground-secondary-color)' }}>
                Bienvenido al panel de control de tu negocio. Aquí podrás ver un resumen de tus ventas y operaciones.
            </p>
            {/* Contenido en el futuro (gráficos, tarjetas de métricas) */}
        </div>
    );
}
