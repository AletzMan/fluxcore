import { z } from "zod";
import { ValidationRules } from "./validation-rules";

// We extract enum values for zod validation
// but since typescript enums aren't easily validatable with standard z.enum if they are mixed, 
// we use z.nativeEnum or z.any for simplicity inside react-hook-form
import { CfdiUsage, TaxRegime } from "@/enums/common.enums"; 

export const CustomerSchema = z.object({
    firstName: z.string()
        .min(ValidationRules.CUSTOMER.NAME.MIN_LENGTH, `El nombre debe tener al menos ${ValidationRules.CUSTOMER.NAME.MIN_LENGTH} caracteres`)
        .max(ValidationRules.CUSTOMER.NAME.MAX_LENGTH, `El nombre debe tener menos de ${ValidationRules.CUSTOMER.NAME.MAX_LENGTH} caracteres`),
    lastName: z.string()
        .min(ValidationRules.CUSTOMER.NAME.MIN_LENGTH, `El apellido debe tener al menos ${ValidationRules.CUSTOMER.NAME.MIN_LENGTH} caracteres`)
        .max(ValidationRules.CUSTOMER.NAME.MAX_LENGTH, `El apellido debe tener menos de ${ValidationRules.CUSTOMER.NAME.MAX_LENGTH} caracteres`),
    rfc: z.string()
        .regex(ValidationRules.CUSTOMER.RFC.PATTERN, ValidationRules.CUSTOMER.RFC.MESSAGE),
    zipCode: z.string()
        .min(5, "El código postal debe tener 5 dígitos")
        .max(5, "El código postal debe tener 5 dígitos"),
    taxRegime: z.nativeEnum(TaxRegime, { error: "Régimen Fiscal requerido" }),
    cfdiUsage: z.nativeEnum(CfdiUsage, { error: "Uso de CFDI requerido" }),
    email: z.string()
        .regex(ValidationRules.EMAIL.PATTERN, ValidationRules.EMAIL.MESSAGE)
        .max(ValidationRules.EMAIL.MAX_LENGTH),
    phoneNumber: z.string()
        .regex(ValidationRules.CUSTOMER.PHONE.PATTERN, ValidationRules.CUSTOMER.PHONE.MESSAGE),
    address: z.string()
        .min(5, "La dirección debe tener al menos 5 caracteres"),
});

export type CustomerFormValues = z.infer<typeof CustomerSchema>;

export const UpdateCustomerSchema = CustomerSchema.extend({
    isActive: z.boolean().optional()
});

export type UpdateCustomerFormValues = z.infer<typeof UpdateCustomerSchema>;
