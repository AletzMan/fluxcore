import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormCustomer } from "./components/FormCustomer/FormCustomer";
import styles from "../../CustomerPage.module.scss";

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
