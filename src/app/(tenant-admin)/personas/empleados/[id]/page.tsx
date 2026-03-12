import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { employeeService } from "@/app/services/api/employee.service";
import styles from "./EmployeeDetailPage.module.scss";
import { Link, Tag } from "lambda-ui-components";
import { MoveLeft } from "lucide-react";
import { DetailCard } from "@/app/components/ui/DetailCard/DetailCard";
import { EditSection } from "@/app/(super-admin)/admin/components/EditSection/EditSection";
import { EMPLOYEE_SECTIONS } from "@/app/constants/employeeSections";
import { EditEmployeeFormWrapper } from "../components/EditEmployeeFormWrapper/EditEmployeeFormWrapper";
import { TableError } from "@/app/components/ui/TableError/TableError";

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let employee = null;
    let isError = false;
    let errorCode = "";

    try {
        const res = await employeeService.getEmployeeById(Number(id));
        if (res.success && res.data) {
            employee = res.data;
        } else {
            isError = true;
            errorCode = res.errorCode || "";
        }
    } catch (error: any) {
        isError = true;
        errorCode = error?.errorCode || "";
    }

    if (isError || !employee) {
        return (
            <ContainerSection
                title="Perfil del Empleado"
                description="Gestión de los datos maestros del empleado."
            >
                <div className={styles.employeepage}>
                    <TableError
                        isError={isError}
                        isMaintenance={errorCode === "SERVICE_UNAVAILABLE"}
                        isEmptyResponse={!employee && !isError}
                        isNotFound={errorCode === "NOT_FOUND"}
                        isSearch={false}
                        hasAddButton={false}
                    />
                </div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title={`Perfil del Empleado`}
            description="Visualiza y edita los permisos y datos maestros del empleado por secciones."
        >
            <div className={styles.employeepage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>{employee.name}</h1>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* Información General */}
                    <DetailCard
                        title="Datos Generales"
                        editAction={<EditSection sectionId={EMPLOYEE_SECTIONS.GENERAL} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Código Interno</span>
                                <span>{employee.userCode}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Nombre Completo</span>
                                <span>{employee.name}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Nombre de Usuario</span>
                                <span>{employee.username}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Contacto */}
                    <DetailCard
                        title="Contacto de Medio de Comunicación"
                        editAction={<EditSection sectionId={EMPLOYEE_SECTIONS.CONTACT} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Correo Electrónico</span>
                                <span>{employee.email || "No especificado"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Roles */}
                    <DetailCard
                        title="Asignación de Roles y Permisos"
                        editAction={<EditSection sectionId={EMPLOYEE_SECTIONS.ROLE} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Rol Principal</span>
                                <span>{employee.roleName.replace(/_/g, ' ')}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Estado e Información */}
                    <DetailCard
                        title="Estado de Acceso"
                        editAction={<EditSection sectionId={EMPLOYEE_SECTIONS.STATUS} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.rowInline}>
                                <span>¿Acceso al sistema permitido?:</span>
                                <Tag
                                    text={employee.isActive ? 'Activo' : 'Inactivo'}
                                    color={employee.isActive ? 'success' : 'neutral'}
                                    size='small'
                                    radius='small'
                                    variant='subtle'
                                />
                            </div>
                        </div>
                    </DetailCard>
                </div>
            </div>

            <EditEmployeeFormWrapper employeeId={employee.id} employee={employee} />
        </ContainerSection>
    );
}
