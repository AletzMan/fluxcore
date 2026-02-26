"use client";
import { GeneralSchema, ContactSchema, StatusSchema, LogoSchema, GeneralValues, ContactValues, StatusValues, LogoValues } from '@/validations/tenant.schema';
import { EditForm, EditFormField } from '../../../components/EditForm/EditForm';
import { useEditSectionStore } from '@/app/store/editsection.store';
import { Tenant } from '@/typesModels/Tenant';
import { TENANT_SECTIONS } from '@/app/constants/tenantSections';
import { updateTenantAction } from '@/app/actions/tenant.actions';
import { PlanStatusType } from '@/enums/common.enums';


const generalFields: EditFormField<GeneralValues>[] = [
    { key: 'companyName', label: 'Compañía', type: 'text', placeholder: 'Ej. Acme Corp' },
    { key: 'taxId', label: 'RFC / Tax ID', type: 'text', placeholder: 'XEXX010101000' },
    { key: 'address', label: 'Dirección', type: 'textarea', placeholder: 'Calle, número, colonia...' },
];

const contactFields: EditFormField<ContactValues>[] = [
    { key: 'email', label: 'Email', type: 'text', placeholder: 'contacto@acme.com' },
    { key: 'phone', label: 'Teléfono', type: 'text', placeholder: '5501020304' },
];

const statusFields: EditFormField<StatusValues>[] = [
    {
        key: 'status',
        label: 'Estado de la cuenta',
        type: 'select',
        options: [
            { label: 'Activo', value: PlanStatusType.ACTIVE },
            { label: 'Prueba', value: PlanStatusType.TRIAL },
            { label: 'Suspendido', value: PlanStatusType.SUSPENDED },
            { label: 'Expirado', value: PlanStatusType.EXPIRED },
            { label: 'Cancelado', value: PlanStatusType.CANCELLED },
        ]
    },
    { key: 'isActive', label: 'Habilitado (Acceso permitido)', type: 'boolean' },
];

const logoFields: EditFormField<LogoValues>[] = [
    { key: 'logoFile', label: 'Logo', type: 'file' },
];

// ─── Wrapper ──────────────────────────────────────────────────────────────────

interface EditTenantFormWrapperProps {
    tenantId: number;
    tenant: Tenant;
}

export const EditTenantFormWrapper = ({ tenantId, tenant }: EditTenantFormWrapperProps) => {
    const activeSection = useEditSectionStore((s) => s.activeSection);
    const closeSection = useEditSectionStore((s) => s.closeSection);

    // Si tuvieramos que hacer patch direct
    const apiUrl = `/tenants/${tenantId}`;

    return (
        <>
            {/* ── Sección: Información General ── */}
            <EditForm<GeneralValues>
                fields={generalFields}
                defaultValues={{
                    companyName: tenant.companyName,
                    taxId: tenant.taxId ?? '',
                    address: tenant.address ?? '',
                }}
                schema={GeneralSchema}
                apiUrl={apiUrl}
                method='PATCH'
                isMultipart
                title="Información General"
                description="Modifica los datos principales del Tenant."
                isOpen={activeSection === TENANT_SECTIONS.GENERAL}
                onClose={closeSection}
                id={tenantId}
                onSubmitAction={updateTenantAction}
            />

            {/* ── Sección: Contacto ── */}
            <EditForm<ContactValues>
                fields={contactFields}
                defaultValues={{
                    email: tenant.email,
                    phone: tenant.phone ?? '',
                }}
                schema={ContactSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Contacto"
                isMultipart
                description="Actualiza la información de contacto principal."
                isOpen={activeSection === TENANT_SECTIONS.CONTACT}
                onClose={closeSection}
                id={tenantId}
                onSubmitAction={updateTenantAction}
            />

            {/* ── Sección: Estado (Status e IsActive) ── */}
            <EditForm<StatusValues>
                fields={statusFields}
                defaultValues={{
                    status: tenant.status as PlanStatusType,
                    isActive: tenant.isActive,
                }}
                schema={StatusSchema}
                apiUrl={apiUrl}
                method='PATCH'
                isMultipart
                title="Suscripción & Estado"
                description="Cambia el estado administrativo del Tenant."
                isOpen={activeSection === TENANT_SECTIONS.STATUS}
                onClose={closeSection}
                id={tenantId}
                onSubmitAction={updateTenantAction}
            />

            {/* ── Sección: Logo ── */}
            <EditForm<LogoValues>
                fields={logoFields}
                defaultValues={{
                    logoFile: new File([], tenant.logoUrl ?? '', { type: 'image/png' }),
                }}
                schema={LogoSchema}
                apiUrl={apiUrl}
                method='PATCH'
                isMultipart
                title="Logo"
                description="Actualiza el logo del Tenant."
                isOpen={activeSection === TENANT_SECTIONS.LOGO}
                onClose={closeSection}
                id={tenantId}
                onSubmitAction={updateTenantAction}
            />
        </>
    );
};
