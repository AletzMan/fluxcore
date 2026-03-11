import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import styles from "../ProviderPage.module.scss";
import { FormProvider } from "./components/FormProvider/FormProvider";

export default function NuevoProveedorPage() {
    return (
        <ContainerSection
            title="Nuevo Proveedor"
            description="Completa los campos para registrar un nuevo proveedor en tu entorno."
        >
            <div className={styles.container}>
                <FormProvider />
            </div>
        </ContainerSection>
    );
}
