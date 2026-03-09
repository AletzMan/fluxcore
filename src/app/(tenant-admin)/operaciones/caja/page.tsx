import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";

export default function CajaPage() {
    return (
        <ContainerSection
            title="Caja y Sesiones"
            description="Gestiona las aperturas y los cortes de caja, así como el dinero en efectivo."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                {/* Contenido de caja aquí */}
            </div>
        </ContainerSection>
    );
}
