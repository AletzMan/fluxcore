import { Breadcrumb } from "lambda-ui-components";

export default function InventoryPage() {
    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Inventario", href: "/inventario" }
                ]}
            />
            <h1 style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-2xl)' }}>Inventario</h1>
            <p style={{ color: 'var(--foreground-secondary-color)' }}>
                Controla tus productos, variantes, marcas y existencias reales.
            </p>
        </div>
    );
}
