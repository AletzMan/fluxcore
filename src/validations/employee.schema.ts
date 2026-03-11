import { z } from "zod";

export const EmployeeGeneralSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100),
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").max(50),
});
export type EmployeeGeneralValues = z.infer<typeof EmployeeGeneralSchema>;

export const EmployeeContactSchema = z.object({
    email: z.string().email("Correo electrónico inválido"),
});
export type EmployeeContactValues = z.infer<typeof EmployeeContactSchema>;

export const EmployeeRoleSchema = z.object({
    roleId: z.coerce.number().min(1, "Debe seleccionar un rol válido"),
});
export type EmployeeRoleValues = z.infer<typeof EmployeeRoleSchema>;

export const EmployeeStatusSchema = z.object({
    isActive: z.boolean(),
});
export type EmployeeStatusValues = z.infer<typeof EmployeeStatusSchema>;

export const EmployeePasswordSchema = z.object({
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Master schema para creación
export const EmployeeSchema = EmployeeGeneralSchema
    .merge(EmployeeContactSchema)
    .merge(EmployeeRoleSchema)
    .merge(EmployeePasswordSchema);

export type EmployeeFormValues = z.infer<typeof EmployeeSchema>;

export const UpdateEmployeeSchema = EmployeeGeneralSchema
    .merge(EmployeeContactSchema)
    .merge(EmployeeRoleSchema)
    .merge(EmployeeStatusSchema);
    
export type UpdateEmployeeFormValues = z.infer<typeof UpdateEmployeeSchema>;
