"use client";
import {
    ProviderGeneralSchema,
    ProviderContactSchema,
    ProviderTaxSchema,
    ProviderGeneralValues,
    ProviderContactValues,
    ProviderTaxValues
} from '@/validations/provider.schema';
import { EditForm, EditFormField } from '@/app/(super-admin)/admin/components/EditForm/EditForm';
import { useEditSectionStore } from '@/app/store/editsection.store';
import { Provider } from '@/typesModels/Provider';
import { PROVIDER_SECTIONS } from '@/app/constants/providerSections';
import { updateProviderSectionAction } from '@/app/actions/provider.actions';

const generalFields: EditFormField<ProviderGeneralValues>[] = [
    { key: 'companyName', label: 'Nombre de la Empresa', type: 'text', placeholder: 'Ej. Computadoras S.A.' },
];

const contactFields: EditFormField<ProviderContactValues>[] = [
    { key: 'contactName', label: 'Nombre del Contacto', type: 'text', placeholder: 'Ej. Juan Pérez' },
    { key: 'contactEmail', label: 'Correo Electrónico', type: 'text', placeholder: 'correo@ejemplo.com' },
    { key: 'contactPhone', label: 'Teléfono', type: 'text', placeholder: '10 dígitos' },
    { key: 'address', label: 'Dirección Completa', type: 'textarea', placeholder: 'Calle, Número, Colonia, Municipio, Estado' },
];

const taxFields: EditFormField<ProviderTaxValues>[] = [
    { key: 'rfc', label: 'RFC', type: 'text', placeholder: 'XAXX010101000' },
];

// ─── Wrapper ──────────────────────────────────────────────────────────────────

interface EditProviderFormWrapperProps {
    providerId: number;
    provider: Provider;
}

export const EditProviderFormWrapper = ({ providerId, provider }: EditProviderFormWrapperProps) => {
    const activeSection = useEditSectionStore((s) => s.activeSection);
    const closeSection = useEditSectionStore((s) => s.closeSection);

    const apiUrl = `/providers/${providerId}`;

    return (
        <>
            {/* ── Sección: Información General ── */}
            <EditForm<ProviderGeneralValues>
                fields={generalFields}
                defaultValues={{
                    companyName: provider.companyName,
                }}
                schema={ProviderGeneralSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Información General"
                description="Modifica el nombre de la empresa proveedora."
                isOpen={activeSection === PROVIDER_SECTIONS.GENERAL}
                onClose={closeSection}
                id={providerId}
                onSubmitAction={updateProviderSectionAction}
            />

            {/* ── Sección: Contacto ── */}
            <EditForm<ProviderContactValues>
                fields={contactFields}
                defaultValues={{
                    contactName: provider.contactName,
                    contactEmail: provider.contactEmail,
                    contactPhone: provider.contactPhone,
                    address: provider.address || '',
                }}
                schema={ProviderContactSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Contacto y Domicilio"
                description="Actualiza la información del representante y domicilio."
                isOpen={activeSection === PROVIDER_SECTIONS.CONTACT}
                onClose={closeSection}
                id={providerId}
                onSubmitAction={updateProviderSectionAction}
            />

            {/* ── Sección: Datos Fiscales ── */}
            <EditForm<ProviderTaxValues>
                fields={taxFields}
                defaultValues={{
                    rfc: provider.rfc,
                }}
                schema={ProviderTaxSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Datos Fiscales"
                description="Actualiza el RFC u otra información fiscal del proveedor."
                isOpen={activeSection === PROVIDER_SECTIONS.TAX}
                onClose={closeSection}
                id={providerId}
                onSubmitAction={updateProviderSectionAction}
            />
        </>
    );
};
