import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { employeeService } from "@/app/services/api/employee.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { Employee } from "@/typesModels/Employee";
import { EmployeeParams } from "@/typesAPI/employee.types";
import { EmployeeView } from "./components/EmployeeView/EmployeeView";
import styles from "./EmployeePage.module.scss";

const getEmployees = async (params: Partial<EmployeeParams>) => {
    try {
        return await employeeService.getEmployees(params);
    } catch (error: any) {
        return { success: false, data: [], errorCode: error?.errorCode } as unknown as PagedResponse<Employee>;
    }
}

export default async function EmpleadosPage({ searchParams }: {
    searchParams: Promise<Partial<EmployeeParams>> | Partial<EmployeeParams>
}) {
    const params = await searchParams;
    const employees = await getEmployees({ ...params });

    return (
        <ContainerSection
            title="Directorio de Empleados"
            description="Administra a los usuarios de la plataforma, roles y accesos."
            titleAddButton="Nuevo Empleado"
            hrefAddButton="/personas/empleados/nuevo"
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando empleados...</div>}>
                    <EmployeeView
                        employees={employees?.data || []}
                        pagination={employees?.pagination!}
                        success={employees?.success}
                        isMaintenance={employees?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
