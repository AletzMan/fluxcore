import { z } from "zod";
import { ValidationRules } from "./validation-rules";

export const TenantSettingsGeneralSchema = z.object({
    companyName: z.string()
        .min(2, "El nombre de la empresa debe tener al menos 2 caracteres")
        .max(100),
    taxId: z.string()
        .regex(ValidationRules.CUSTOMER.RFC.PATTERN, ValidationRules.CUSTOMER.RFC.MESSAGE)
        .optional()
        .or(z.literal('')),
});
export type TenantSettingsGeneralValues = z.infer<typeof TenantSettingsGeneralSchema>;

export const TenantSettingsContactSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    phone: z.string().regex(ValidationRules.CUSTOMER.PHONE.PATTERN, ValidationRules.CUSTOMER.PHONE.MESSAGE),
    address: z.string().min(5, "La dirección debe tener al menos 5 caracteres").optional().or(z.literal('')),
});
export type TenantSettingsContactValues = z.infer<typeof TenantSettingsContactSchema>;

export const TenantSettingsLogoSchema = z.object({
    logoFile: z.instanceof(File).optional(),
});
export type TenantSettingsLogoValues = z.infer<typeof TenantSettingsLogoSchema>;

export const UpdateTenantSettingsSchema = TenantSettingsGeneralSchema
    .merge(TenantSettingsContactSchema)
    .merge(TenantSettingsLogoSchema);

export type UpdateTenantSettingsValues = z.infer<typeof UpdateTenantSettingsSchema>;
