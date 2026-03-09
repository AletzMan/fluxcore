import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";

export default function ProductosPage() {
    return (
        <ContainerSection
            title="Productos Maestros"
            description="Agrega y actualiza la información general de los productos que vendes."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                {/* Contenido de productos aquí */}
            </div>
        </ContainerSection>
    );
}
