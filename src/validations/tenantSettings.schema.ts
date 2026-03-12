import { z } from "zod";
import { ValidationRules } from "./validation-rules";
import { ErrorMessages } from "@/lib/errors/message-errors";

export const TenantSettingsGeneralSchema = z.object({
    companyName: z.string()
        .min(2, ErrorMessages.COMPANY_NAME_MIN_LENGTH)
        .max(100),
    taxId: z.string()
        .regex(ValidationRules.CUSTOMER.RFC.PATTERN, ValidationRules.CUSTOMER.RFC.MESSAGE),
});
export type TenantSettingsGeneralValues = z.infer<typeof TenantSettingsGeneralSchema>;

export const TenantSettingsContactSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
    phone: z.string().regex(ValidationRules.CUSTOMER.PHONE.PATTERN, ValidationRules.CUSTOMER.PHONE.MESSAGE),
    address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
});
export type TenantSettingsContactValues = z.infer<typeof TenantSettingsContactSchema>;

export const TenantSettingsLogoSchema = z.object({
    logoFile: z.any().optional(),
});
export type TenantSettingsLogoValues = z.infer<typeof TenantSettingsLogoSchema>;

export const UpdateTenantSettingsSchema = TenantSettingsGeneralSchema
    .merge(TenantSettingsContactSchema)
    .merge(TenantSettingsLogoSchema);

export type UpdateTenantSettingsValues = z.infer<typeof UpdateTenantSettingsSchema>;
