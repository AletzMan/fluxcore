import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormProductMaster } from "./components/FormProductMaster/FormProductMaster";
import styles from "../Productspage.module.scss";

export default function NuevoProductoPage() {
    return (
        <ContainerSection
            title="Nuevo Producto Maestro"
            description="Crea la ficha general de un nuevo producto; posteriormente podrás configurar sus variantes como precio o talla."
        >
            <div className={styles.formWrapper}>
                <FormProductMaster />
            </div>
        </ContainerSection>
    );
}
