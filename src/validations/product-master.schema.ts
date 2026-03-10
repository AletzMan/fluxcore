import { z } from "zod";

export const ProductMasterSchema = z.object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }).max(100, { message: "Máximo 100 caracteres" }),
    description: z.string().max(500, { message: "Máximo 500 caracteres" }).optional(),
    categoryId: z.number().int().positive({ message: "Selecciona una categoría válida" }),
    brandId: z.number().int().positive({ message: "Selecciona una marca válida" })
});

export type ProductMasterFormValues = z.infer<typeof ProductMasterSchema>;
