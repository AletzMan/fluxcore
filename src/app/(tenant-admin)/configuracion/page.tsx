import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";

export default function SettingsStorePage() {
    return (
        <ContainerSection
            title="Configuración de Sucursal/Empresa"
            description="Edita los datos de la sucursal, ticket, y métodos de pago aceptados."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                {/* Contenido de configuración aquí */}
            </div>
        </ContainerSection>
    );
}
