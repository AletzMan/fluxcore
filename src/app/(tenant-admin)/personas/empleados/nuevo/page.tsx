import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import styles from "../../EmployeePage.module.scss";
import { FormEmployee } from "./components/FormEmployee/FormEmployee";

export default function NuevoEmpleadoPage() {
    return (
        <ContainerSection
            title="Nuevo Empleado"
            description="Crea un acceso al sistema. Su código de colaborador se generará automáticamente."
        >
            <div className={styles.container}>
                <FormEmployee />
            </div>
        </ContainerSection>
    );
}
