"use client";
import {
    EmployeeGeneralSchema,
    EmployeeContactSchema,
    EmployeeRoleSchema,
    EmployeeStatusSchema,
    EmployeeGeneralValues,
    EmployeeContactValues,
    EmployeeRoleValues,
    EmployeeStatusValues
} from '@/validations/employee.schema';
import { EditForm, EditFormField } from '@/app/(super-admin)/admin/components/EditForm/EditForm';
import { useEditSectionStore } from '@/app/store/editsection.store';
import { Employee } from '@/typesModels/Employee';
import { EMPLOYEE_SECTIONS } from '@/app/constants/employeeSections';
import { updateEmployeeSectionAction } from '@/app/actions/employee.actions';
import { UserRole } from '@/enums/common.enums';

// Helper to convert enums to select options
const getUserRoleOptions = () => Object.entries(UserRole)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ label: key.replace(/_/g, ' '), value: value!.toString() }));

const generalFields: EditFormField<EmployeeGeneralValues>[] = [
    { key: 'name', label: 'Nombre Completo', type: 'text', placeholder: 'Ej. Juan Pérez' },
    { key: 'username', label: 'Nombre de Usuario', type: 'text', placeholder: 'jperez' }
];

const contactFields: EditFormField<EmployeeContactValues>[] = [
    { key: 'email', label: 'Correo Electrónico', type: 'text', placeholder: 'correo@ejemplo.com' }
];

const roleFields: EditFormField<EmployeeRoleValues>[] = [
    { key: 'roleId', label: 'Rol del Sistema', type: 'select', options: getUserRoleOptions() }
];

const statusFields: EditFormField<EmployeeStatusValues>[] = [
    { key: 'isActive', label: 'Activo en el sistema', type: 'boolean' }
];

// ─── Wrapper ──────────────────────────────────────────────────────────────────

interface EditEmployeeFormWrapperProps {
    employeeId: number;
    employee: Employee;
}

export const EditEmployeeFormWrapper = ({ employeeId, employee }: EditEmployeeFormWrapperProps) => {
    const activeSection = useEditSectionStore((s) => s.activeSection);
    const closeSection = useEditSectionStore((s) => s.closeSection);

    const apiUrl = `/users/${employeeId}`; // fallback API url for component if needed

    return (
        <>
            {/* ── Sección: Información General ── */}
            <EditForm<EmployeeGeneralValues>
                fields={generalFields}
                defaultValues={{
                    name: employee.name,
                    username: employee.username
                }}
                schema={EmployeeGeneralSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Información General"
                description="Modifica los nombres de acceso y nombres legibles del empleado."
                isOpen={activeSection === EMPLOYEE_SECTIONS.GENERAL}
                onClose={closeSection}
                id={employeeId}
                onSubmitAction={updateEmployeeSectionAction}
            />

            {/* ── Sección: Contacto ── */}
            <EditForm<EmployeeContactValues>
                fields={contactFields}
                defaultValues={{
                    email: employee.email,
                }}
                schema={EmployeeContactSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Contacto"
                description="Actualiza el correo electrónico del empleado para recuperación o notificaciones."
                isOpen={activeSection === EMPLOYEE_SECTIONS.CONTACT}
                onClose={closeSection}
                id={employeeId}
                onSubmitAction={updateEmployeeSectionAction}
            />

            {/* ── Sección: Rol de Acceso ── */}
            <EditForm<EmployeeRoleValues>
                fields={roleFields}
                defaultValues={{
                    roleId: employee.roleId || 0,
                }}
                schema={EmployeeRoleSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Configuración de Roles y Permisos"
                description="Cambia el nivel de autorización y acceso del empleado en el sistema."
                isOpen={activeSection === EMPLOYEE_SECTIONS.ROLE}
                onClose={closeSection}
                id={employeeId}
                onSubmitAction={updateEmployeeSectionAction}
            />

            {/* ── Sección: Estado de la Cuenta ── */}
            <EditForm<EmployeeStatusValues>
                fields={statusFields}
                defaultValues={{
                    isActive: employee.isActive,
                }}
                schema={EmployeeStatusSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Disponibilidad de la Cuenta"
                description="Pausa o reanuda el acceso del empleado al sistema de FluxCore sin borrar sus historiales de movimiento."
                isOpen={activeSection === EMPLOYEE_SECTIONS.STATUS}
                onClose={closeSection}
                id={employeeId}
                onSubmitAction={updateEmployeeSectionAction}
            />
        </>
    );
};
