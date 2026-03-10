import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormCategory } from "./components/FormCategory/FormCategory";

export default function NuevaCategoriaPage() {
    return (
        <ContainerSection
            title="Nueva Categoría"
            description="Agrega una nueva agrupación lógica para clasificar los productos del inventario."
        >
            <div style={{ padding: 'var(--spacing-lg)', maxWidth: '600px', margin: '0 auto' }}>
                <FormCategory />
            </div>
        </ContainerSection>
    );
}
