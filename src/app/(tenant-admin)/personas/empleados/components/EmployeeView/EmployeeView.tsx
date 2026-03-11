"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Employee } from "@/typesModels/Employee";
import { Pagination } from "@/typesAPI/common.types";
import { Tag, useNotification } from "lambda-ui-components";
import { employeeService } from "@/app/services/api/employee.service";
import styles from "./EmployeeView.module.scss";
import { UserRole } from "@/enums/common.enums";

// Helper to check what color to use for a role
const getRoleColor = (roleName: string) => {
    switch (roleName) {
        case 'SUPER_ADMIN':
            return 'danger';
        case 'ADMIN':
            return 'warning';
        case 'MANAGER':
            return 'primary';
        case 'CASHIER':
            return 'success';
        default:
            return 'neutral';
    }
};

const getUserRoleOptions = () => Object.entries(UserRole)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ label: key.replace(/_/g, ' '), value: value!.toString() }));

interface EmployeeViewProps {
    employees: Employee[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const EmployeeView = ({ employees, pagination, success, isMaintenance }: EmployeeViewProps) => {
    const { showNotification } = useNotification();

    const deleteEmployee = async (id: number) => {
        try {
            const response = await employeeService.deactivateEmployee(id);

            if (response.success) {
                setTimeout(() => {
                    document.location.reload();
                }, 1000);
                showNotification({
                    message: "Empleado desactivado correctamente",
                    notificationType: "success",
                });
            } else {
                showNotification({
                    message: response.message || "Error al desactivar el empleado",
                    notificationType: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: "Error de red al desactivar el empleado",
                notificationType: "danger",
            });
        }
    };

    const columns: DataTableColumn<Employee>[] = [
        {
            sortKey: "userCode",
            nameColumn: "Código",
            isSortable: true,
            align: "center",
            width: "80px",
            render: (employee) => employee.userCode
        },
        {
            sortKey: "name",
            nameColumn: "Empleado",
            isSortable: true,
            width: "220px",
            render: (employee) => (
                <div>
                    <strong className={styles.name}>{employee.name}</strong>
                    <div className={styles.email}>{employee.email}</div>
                </div>
            )
        },
        {
            sortKey: "username",
            nameColumn: "Usuario",
            isSortable: true,
            width: "140px",
            render: (employee) => employee.username
        },
        {
            sortKey: "roleName",
            nameColumn: "Rol",
            isSortable: true,
            width: "160px",
            render: (employee) => (
                <Tag
                    size="small"
                    variant="subtle"
                    radius="small"
                    color={getRoleColor(employee.roleName)}
                >
                    {employee.roleName.replace(/_/g, ' ')}
                </Tag>
            )
        },
        {
            sortKey: "isActive",
            nameColumn: "Estado",
            isSortable: true,
            align: "center",
            width: "100px",
            render: (employee) => (
                <Tag
                    size="small"
                    variant="subtle"
                    radius="small"
                    color={employee.isActive ? "success" : "neutral"}
                >
                    {employee.isActive ? "Activo" : "Inactivo"}
                </Tag>
            )
        }
    ];

    return (
        <DataTable
            data={employees}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["view", "delete"]}
            onDelete={(id) => deleteEmployee(Number(id))}
            hasAddButton={true}
            urlAddButton="/personas/empleados/nuevo"
            filters={[
                { id: "f_act", key: "isActive", value: "true", label: "Solo Activos", type: "boolean", nameGroup: "Estado" },
                { id: "f_inact", key: "isActive", value: "false", label: "Inactivos", type: "boolean", nameGroup: "Estado" },
                ...getUserRoleOptions().map(opt => ({
                    id: `role_${opt.value}`,
                    key: "role",
                    value: opt.value,
                    label: opt.label,
                    type: "multiple-choice" as const,
                    nameGroup: "Rol de Usuario"
                }))
            ]}
        />
    );
};
