import { z } from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }).max(100, { message: "Máximo 100 caracteres" }),
    description: z.string().max(500, { message: "Máximo 500 caracteres" }).optional()
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
