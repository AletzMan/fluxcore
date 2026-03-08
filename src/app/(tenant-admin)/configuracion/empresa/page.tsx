import { Breadcrumb } from "lambda-ui-components";

export default function SettingsStorePage() {
    return (
        <div>
            <Breadcrumb
                items={[
                    { label: "Configuración", href: "/configuracion" },
                    { label: "Empresa", href: "/configuracion/empresa" }
                ]}
            />
            <h1 style={{ marginTop: 'var(--spacing-lg)', fontSize: 'var(--font-size-2xl)' }}>Configuración de Sucursal/Empresa</h1>
            <p style={{ color: 'var(--foreground-secondary-color)' }}>
                Edita los datos de la sucursal, ticket, y métodos de pago aceptados.
            </p>
        </div>
    );
}
