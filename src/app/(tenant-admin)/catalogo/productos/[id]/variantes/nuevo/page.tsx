import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormProductVariant } from "./components/FormProductVariant/FormProductVariant";

export default async function NuevaVariantePage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    return (
        <ContainerSection
            title={`Nueva Variante`}
            description={`Registra una nueva variante física para el producto #${id} conectando su propio stock y precios.`}
        >
            <div style={{ padding: 'var(--spacing-lg)', maxWidth: '800px', margin: '0 auto' }}>
                <FormProductVariant productMasterId={Number(id)} />
            </div>
        </ContainerSection>
    );
}
