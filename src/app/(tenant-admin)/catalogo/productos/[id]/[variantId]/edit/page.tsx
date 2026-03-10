import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { productVariantService } from "@/app/services/api/product-variant.service";
import styles from "../../../../Productspage.module.scss";
import { FormProductVariant } from "../../variantes/nuevo/components/FormProductVariant/FormProductVariant";

export default async function EditarVariantePage({ params }: { params: Promise<{ id: string, variantId: string }> | { id: string, variantId: string } }) {
    const resolvedParams = await params;

    let variant = null;
    try {
        const response = await productVariantService.getProductVariantById(resolvedParams.variantId);
        variant = response.data;
    } catch {
        return (
            <ContainerSection title="Editar Variante" description="No se encontró la variante solicitada.">
                <div>Variante no encontrada.</div>
            </ContainerSection>
        );
    }

    if (!variant) {
        return (
            <ContainerSection title="Editar Variante" description="No se encontró la variante solicitada.">
                <div>Variante no encontrada.</div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title="Editar Variante"
            description="Modifica la información física, el precio y stock mínimo de esta variante."
        >
            <div className={styles.formWrapper}>
                <FormProductVariant productMasterId={Number(resolvedParams.id)} variant={variant!} />
            </div>
        </ContainerSection>
    );
}
