import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormProductVariant } from "./components/FormProductVariant/FormProductVariant";
import styles from "../../../Productspage.module.scss";

export default async function NuevaVariantePage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    return (
        <ContainerSection
            title={`Nueva Variante`}
            description={`Registra una nueva variante física para el producto #${id} conectando su propio stock y precios.`}
        >
            <div className={styles.formWrapper}>
                <FormProductVariant productMasterId={Number(id)} />
            </div>
        </ContainerSection>
    );
}
