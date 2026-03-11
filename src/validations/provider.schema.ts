import { z } from "zod";
import { ValidationRules } from "./validation-rules";

// ── SCHEMAS BASE (Para edición por partes) ──
export const ProviderGeneralSchema = z.object({
    companyName: z.string()
        .min(ValidationRules.CUSTOMER.NAME.MIN_LENGTH, `El nombre de la empresa debe tener al menos ${ValidationRules.CUSTOMER.NAME.MIN_LENGTH} caracteres`)
        .max(ValidationRules.CUSTOMER.NAME.MAX_LENGTH, `El nombre de la empresa debe tener menos de ${ValidationRules.CUSTOMER.NAME.MAX_LENGTH} caracteres`),
});
export type ProviderGeneralValues = z.infer<typeof ProviderGeneralSchema>;

export const ProviderContactSchema = z.object({
    contactName: z.string()
        .min(ValidationRules.CUSTOMER.NAME.MIN_LENGTH, `El nombre de contacto debe tener al menos ${ValidationRules.CUSTOMER.NAME.MIN_LENGTH} caracteres`)
        .max(ValidationRules.CUSTOMER.NAME.MAX_LENGTH, `El nombre de contacto debe tener menos de ${ValidationRules.CUSTOMER.NAME.MAX_LENGTH} caracteres`),
    contactEmail: z.string()
        .regex(ValidationRules.EMAIL.PATTERN, ValidationRules.EMAIL.MESSAGE)
        .max(ValidationRules.EMAIL.MAX_LENGTH),
    contactPhone: z.string()
        .regex(ValidationRules.CUSTOMER.PHONE.PATTERN, ValidationRules.CUSTOMER.PHONE.MESSAGE),
    address: z.string()
        .min(5, "La dirección debe tener al menos 5 caracteres").optional().or(z.literal('')),
});
export type ProviderContactValues = z.infer<typeof ProviderContactSchema>;

export const ProviderTaxSchema = z.object({
    rfc: z.string()
        .regex(ValidationRules.CUSTOMER.RFC.PATTERN, ValidationRules.CUSTOMER.RFC.MESSAGE),
});
export type ProviderTaxValues = z.infer<typeof ProviderTaxSchema>;

// ── SCHEMA MÁSTER (Para creación) ──
export const ProviderSchema = ProviderGeneralSchema
    .merge(ProviderContactSchema)
    .merge(ProviderTaxSchema);

export type ProviderFormValues = z.infer<typeof ProviderSchema>;

export const UpdateProviderSchema = ProviderSchema;
export type UpdateProviderFormValues = z.infer<typeof UpdateProviderSchema>;
