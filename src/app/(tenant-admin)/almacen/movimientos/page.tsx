import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";

export default function MovimientosPage() {
    return (
        <ContainerSection
            title="Movimientos de Almacén"
            description="Registra y monitorea entradas, salidas y traspasos de mercancía."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                {/* Contenido de movimientos aquí */}
            </div>
        </ContainerSection>
    );
}
