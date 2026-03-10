import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormCategory } from "./components/FormCategory/FormCategory";
import styles from "../../Categorypage.module.scss";

export default function NuevaCategoriaPage() {
    return (
        <ContainerSection
            title="Nueva Categoría"
            description="Agrega una nueva agrupación lógica para clasificar los productos del inventario."
        >
            <div className={styles.formWrapper}>
                <FormCategory />
            </div>
        </ContainerSection>
    );
}
