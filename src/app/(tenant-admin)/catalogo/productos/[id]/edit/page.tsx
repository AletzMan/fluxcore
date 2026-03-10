import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormProductMaster } from "../../nuevo/components/FormProductMaster/FormProductMaster";
import { productMasterService } from "@/app/services/api/product-master.service";
import styles from "../../../Productspage.module.scss";

export default async function EditarProductoPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = await params;

    let product = null;
    try {
        const response = await productMasterService.getProductMasterById(resolvedParams.id);
        product = response.data;
    } catch {
        return (
            <ContainerSection title="Editar Producto Maestro" description="No se encontró el producto solicitado.">
                <div>Producto no encontrado.</div>
            </ContainerSection>
        );
    }

    if (!product) {
        return (
            <ContainerSection title="Editar Producto Maestro" description="No se encontró el producto solicitado.">
                <div>Producto no encontrado.</div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title="Editar Producto Maestro"
            description="Modifica la información base de este producto."
        >
            <div className={styles.formWrapper}>
                <FormProductMaster product={product!} />
            </div>
        </ContainerSection>
    );
}
