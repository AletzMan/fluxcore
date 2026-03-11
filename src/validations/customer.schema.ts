import { z } from "zod";
import { ValidationRules } from "./validation-rules";
import { CfdiUsage, TaxRegime } from "@/enums/common.enums"; 

// ── SCHEMAS BASE (Para edición por partes) ──
export const CustomerGeneralSchema = z.object({
    firstName: z.string()
        .min(ValidationRules.CUSTOMER.NAME.MIN_LENGTH, `El nombre debe tener al menos ${ValidationRules.CUSTOMER.NAME.MIN_LENGTH} caracteres`)
        .max(ValidationRules.CUSTOMER.NAME.MAX_LENGTH, `El nombre debe tener menos de ${ValidationRules.CUSTOMER.NAME.MAX_LENGTH} caracteres`),
    lastName: z.string()
        .min(ValidationRules.CUSTOMER.NAME.MIN_LENGTH, `El apellido debe tener al menos ${ValidationRules.CUSTOMER.NAME.MIN_LENGTH} caracteres`)
        .max(ValidationRules.CUSTOMER.NAME.MAX_LENGTH, `El apellido debe tener menos de ${ValidationRules.CUSTOMER.NAME.MAX_LENGTH} caracteres`),
});
export type CustomerGeneralValues = z.infer<typeof CustomerGeneralSchema>;

export const CustomerContactSchema = z.object({
    email: z.string()
        .regex(ValidationRules.EMAIL.PATTERN, ValidationRules.EMAIL.MESSAGE)
        .max(ValidationRules.EMAIL.MAX_LENGTH),
    phoneNumber: z.string()
        .regex(ValidationRules.CUSTOMER.PHONE.PATTERN, ValidationRules.CUSTOMER.PHONE.MESSAGE),
    address: z.string()
        .min(5, "La dirección debe tener al menos 5 caracteres").optional().or(z.literal('')),
});
export type CustomerContactValues = z.infer<typeof CustomerContactSchema>;

export const CustomerTaxSchema = z.object({
    rfc: z.string()
        .regex(ValidationRules.CUSTOMER.RFC.PATTERN, ValidationRules.CUSTOMER.RFC.MESSAGE),
    zipCode: z.string()
        .min(5, "El código postal debe tener 5 dígitos")
        .max(5, "El código postal debe tener 5 dígitos"),
    taxRegime: z.nativeEnum(TaxRegime, { error: "Régimen Fiscal requerido" }),
    cfdiUsage: z.nativeEnum(CfdiUsage, { error: "Uso de CFDI requerido" }),
});
export type CustomerTaxValues = z.infer<typeof CustomerTaxSchema>;

export const CustomerStatusSchema = z.object({
    isActive: z.boolean(),
});
export type CustomerStatusValues = z.infer<typeof CustomerStatusSchema>;

// ── SCHEMA MÁSTER (Para creación) ──
export const CustomerSchema = CustomerGeneralSchema
    .merge(CustomerContactSchema)
    .merge(CustomerTaxSchema);

export type CustomerFormValues = z.infer<typeof CustomerSchema>;

// Compatible con formulario de todo el cliente (no usado en EditForm parcial)
export const UpdateCustomerSchema = CustomerSchema.extend({
    isActive: z.boolean().optional()
});
export type UpdateCustomerFormValues = z.infer<typeof UpdateCustomerSchema>;
