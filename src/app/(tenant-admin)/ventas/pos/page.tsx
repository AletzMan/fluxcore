import { Breadcrumb } from "lambda-ui-components";

export default function PosPage() {
    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Ventas", href: "/ventas" },
                    { label: "Punto de Venta", href: "/ventas/pos" }
                ]}
            />
            <h1 style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-2xl)' }}>Punto de Venta (POS)</h1>
            <p style={{ color: 'var(--foreground-secondary-color)' }}>
                Interfaz optimizada para procesar ventas rápidamente.
            </p>
        </div>
    );
}
