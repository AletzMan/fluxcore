import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import styles from "../CustomerPage.module.scss";
import { FormCustomer } from "./components/FormCustomer/FormCustomer";

export default function NuevoClientePage() {
    return (
        <ContainerSection
            title="Nuevo Cliente"
            description="Completa los campos para registrar un nuevo cliente en tu entorno."
        >
            <div className={styles.container}>
                <FormCustomer />
            </div>
        </ContainerSection>
    );
}
