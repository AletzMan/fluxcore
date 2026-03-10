import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormProductMaster } from "./components/FormProductMaster/FormProductMaster";

export default function NuevoProductoPage() {
    return (
        <ContainerSection
            title="Nuevo Producto Maestro"
            description="Crea la ficha general de un nuevo producto; posteriormente podrás configurar sus variantes como precio o talla."
        >
            <div style={{ padding: 'var(--spacing-lg)', maxWidth: '800px', margin: '0 auto' }}>
                <FormProductMaster />
            </div>
        </ContainerSection>
    );
}
