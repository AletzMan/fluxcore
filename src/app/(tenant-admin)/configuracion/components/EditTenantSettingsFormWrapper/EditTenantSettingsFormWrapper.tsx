"use client";
import {
    TenantSettingsGeneralSchema,
    TenantSettingsContactSchema,
    TenantSettingsLogoSchema,
    TenantSettingsGeneralValues,
    TenantSettingsContactValues,
    TenantSettingsLogoValues
} from '@/validations/tenantSettings.schema';
import { EditForm, EditFormField } from '@/app/(super-admin)/admin/components/EditForm/EditForm';
import { useEditSectionStore } from '@/app/store/editsection.store';
import { TenantSettings } from '@/typesModels/TenantSettings';
import { UpdateTenantSettings } from '@/typesAPI/tenants-settings.types';
import { TENANT_SETTINGS_SECTIONS } from '@/app/constants/tenantSettingsSections';
import { updateTenantSettingsSectionAction } from '@/app/actions/tenant-settings.actions';

const generalFields: EditFormField<TenantSettingsGeneralValues>[] = [
    { key: 'companyName', label: 'Nombre de la Empresa', type: 'text', placeholder: 'Ej. Mi Tienda S.A.' },
    { key: 'taxId', label: 'RFC', type: 'text', placeholder: 'XAXX010101000' }
];

const contactFields: EditFormField<TenantSettingsContactValues>[] = [
    { key: 'email', label: 'Correo de Contacto', type: 'text' },
    { key: 'phone', label: 'Teléfono', type: 'text' },
    { key: 'address', label: 'Dirección Física', type: 'textarea' }
];

const logoFields: EditFormField<TenantSettingsLogoValues>[] = [
    { key: 'logoFile', label: 'Logo', type: 'file' }
];

interface EditTenantSettingsFormWrapperProps {
    settings: TenantSettings;
}

export const EditTenantSettingsFormWrapper = ({ settings }: EditTenantSettingsFormWrapperProps) => {
    const activeSection = useEditSectionStore((s) => s.activeSection);
    const closeSection = useEditSectionStore((s) => s.closeSection);

    return (
        <>
            {/* ── Sección: Datos Generales ── */}
            <EditForm<TenantSettingsGeneralValues>
                fields={generalFields}
                defaultValues={{
                    companyName: settings.companyName,
                    taxId: settings.taxId || ''
                }}
                schema={TenantSettingsGeneralSchema}
                apiUrl="/tenant-admin/settings"
                method='PATCH'
                title="Datos de Identidad"
                description="Nombre comercial y registro fiscal de la sucursal."
                isOpen={activeSection === TENANT_SETTINGS_SECTIONS.GENERAL}
                onClose={closeSection}
                id={settings.tenantId}
                onSubmitAction={updateTenantSettingsSectionAction}
            />

            {/* ── Sección: Contacto ── */}
            <EditForm<TenantSettingsContactValues>
                fields={contactFields}
                defaultValues={{
                    email: settings.email || '',
                    phone: settings.phone || '',
                    address: settings.address || ''
                }}
                schema={TenantSettingsContactSchema}
                apiUrl="/tenant-admin/settings"
                method='PATCH'
                title="Información de Contacto"
                description="Datos para tickets y atención al cliente."
                isOpen={activeSection === TENANT_SETTINGS_SECTIONS.CONTACT}
                onClose={closeSection}
                id={settings.tenantId}
                onSubmitAction={updateTenantSettingsSectionAction}
            />

            {/* ── Sección: Logo ── */}
            <EditForm<TenantSettingsLogoValues>
                fields={logoFields}
                defaultValues={{
                    logoFile: new File([], settings.logoUrl || '', { type: 'image/png' }),
                }}
                schema={TenantSettingsLogoSchema}
                apiUrl="/tenant-admin/settings"
                method='PATCH'
                isMultipart
                title="Imagen y Branding"
                description="Actualiza el logo que aparece en el sistema y tickets."
                isOpen={activeSection === TENANT_SETTINGS_SECTIONS.LOGO}
                onClose={closeSection}
                id={settings.tenantId}
                onSubmitAction={updateTenantSettingsSectionAction}
            />
        </>
    );
};
