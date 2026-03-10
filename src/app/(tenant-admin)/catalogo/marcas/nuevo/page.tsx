import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormBrand } from "./components/FormBrand/FormBrand";
import styles from "../Brandpage.module.scss";

export default function NuevaMarcaPage() {
    return (
        <ContainerSection
            title="Nueva Marca"
            description="Completa los campos para crear una marca en tu catálogo."
        >
            <div className={styles.formWrapper}>
                <FormBrand />
            </div>
        </ContainerSection>
    );
}
