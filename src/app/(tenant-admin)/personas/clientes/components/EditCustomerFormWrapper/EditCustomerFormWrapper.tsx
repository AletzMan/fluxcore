"use client";
import {
    CustomerGeneralSchema,
    CustomerContactSchema,
    CustomerTaxSchema,
    CustomerStatusSchema,
    CustomerGeneralValues,
    CustomerContactValues,
    CustomerTaxValues,
    CustomerStatusValues
} from '@/validations/customer.schema';
import { EditForm, EditFormField } from '@/app/(super-admin)/admin/components/EditForm/EditForm';
import { useEditSectionStore } from '@/app/store/editsection.store';
import { Customer } from '@/typesModels/Customer';
import { CUSTOMER_SECTIONS, TAX_REGIME_MAP, CFDI_USAGE_MAP, CFDI_USAGE_CODES } from '@/app/constants/customerSections';
import { updateCustomerSectionAction } from '@/app/actions/customer.actions';
import { CfdiUsage, TaxRegime } from '@/enums/common.enums';

// Helper to convert enums to select options
const getTaxRegimeOptions = () => Object.entries(TaxRegime)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
        label: TAX_REGIME_MAP[value as TaxRegime] || key,
        value: value!.toString()
    }));

const getCfdiUsageOptions = () => Object.entries(CfdiUsage)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => {
        const val = value as number;
        const code = CFDI_USAGE_CODES[val as keyof typeof CFDI_USAGE_CODES] || key;
        const description = CFDI_USAGE_MAP[val as CfdiUsage] || key;
        return {
            label: `${code} - ${description}`,
            value: val.toString()
        };
    });

const getCfdiUsageIndexByCode = (code?: string): CfdiUsage | undefined => {
    if (!code) return undefined;
    const entry = Object.entries(CFDI_USAGE_CODES).find(([_key, val]) => val === code);
    return entry ? Number(entry[0]) as CfdiUsage : undefined;
};

const generalFields: EditFormField<CustomerGeneralValues>[] = [
    { key: 'firstName', label: 'Nombre(s)', type: 'text', placeholder: 'Ej. Juan' },
    { key: 'lastName', label: 'Apellidos', type: 'text', placeholder: 'Ej. Pérez' },
];

const contactFields: EditFormField<CustomerContactValues>[] = [
    { key: 'email', label: 'Correo Electrónico', type: 'text', placeholder: 'correo@ejemplo.com' },
    { key: 'phoneNumber', label: 'Teléfono', type: 'text', placeholder: '10 dígitos' },
    { key: 'address', label: 'Dirección Completa', type: 'textarea', placeholder: 'Calle, Número, Colonia, Municipio, Estado' },
];

const taxFields: EditFormField<CustomerTaxValues>[] = [
    { key: 'rfc', label: 'RFC', type: 'text', placeholder: 'XAXX010101000' },
    { key: 'zipCode', label: 'Código Postal', type: 'text', placeholder: '00000' },
    { key: 'taxRegime', label: 'Régimen Fiscal', type: 'select', options: getTaxRegimeOptions() },
    { key: 'cfdiUsage', label: 'Uso de CFDI', type: 'select', options: getCfdiUsageOptions() },
];

const statusFields: EditFormField<CustomerStatusValues>[] = [
    { key: 'isActive', label: 'Activo en el sistema', type: 'boolean' },
];

// ─── Wrapper ──────────────────────────────────────────────────────────────────

interface EditCustomerFormWrapperProps {
    customerId: number;
    customer: Customer;
}

export const EditCustomerFormWrapper = ({ customerId, customer }: EditCustomerFormWrapperProps) => {
    const activeSection = useEditSectionStore((s) => s.activeSection);
    const closeSection = useEditSectionStore((s) => s.closeSection);

    const apiUrl = `/customers/${customerId}`; // Used only if no submitAction is provided, EditForm uses our Action.

    return (
        <>
            {/* ── Sección: Información General ── */}
            <EditForm<CustomerGeneralValues>
                fields={generalFields}
                defaultValues={{
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                }}
                schema={CustomerGeneralSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Información Personal"
                description="Modifica el nombre y apellidos del cliente."
                isOpen={activeSection === CUSTOMER_SECTIONS.GENERAL}
                onClose={closeSection}
                id={customerId}
                onSubmitAction={updateCustomerSectionAction}
            />

            {/* ── Sección: Contacto ── */}
            <EditForm<CustomerContactValues>
                fields={contactFields}
                defaultValues={{
                    email: customer.email,
                    phoneNumber: customer.phoneNumber,
                    address: customer.address || '',
                }}
                schema={CustomerContactSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Contacto"
                description="Actualiza la información de contacto y dirección."
                isOpen={activeSection === CUSTOMER_SECTIONS.CONTACT}
                onClose={closeSection}
                id={customerId}
                onSubmitAction={updateCustomerSectionAction}
            />

            {/* ── Sección: Datos Fiscales ── */}
            <EditForm<CustomerTaxValues>
                fields={taxFields}
                defaultValues={{
                    rfc: customer.rfc,
                    zipCode: customer.address, // API uses zipCode separately internally but usually we store it in address or model differently
                    taxRegime: customer.taxRegimeCode,
                    cfdiUsage: getCfdiUsageIndexByCode(customer.cfdiUsageCode) as CfdiUsage,
                }}
                schema={CustomerTaxSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Datos Fiscales"
                description="Actualiza la información fiscal del cliente."
                isOpen={activeSection === CUSTOMER_SECTIONS.TAX}
                onClose={closeSection}
                id={customerId}
                onSubmitAction={updateCustomerSectionAction}
            />

            {/* ── Sección: Estado ── */}
            <EditForm<CustomerStatusValues>
                fields={statusFields}
                defaultValues={{
                    isActive: customer.isActive,
                }}
                schema={CustomerStatusSchema}
                apiUrl={apiUrl}
                method='PATCH'
                title="Estado de la Cuenta"
                description="Cambia el estado activo o inactivo del cliente."
                isOpen={activeSection === CUSTOMER_SECTIONS.STATUS}
                onClose={closeSection}
                id={customerId}
                onSubmitAction={updateCustomerSectionAction}
            />
        </>
    );
};
