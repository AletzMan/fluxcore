import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";

export default function ClientesPage() {
    return (
        <ContainerSection
            title="Directorio de Clientes"
            description="Mantén el contacto, perfiles y el historial de comportamiento de tus clientes."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                {/* Contenido de clientes aquí */}
            </div>
        </ContainerSection>
    );
}
