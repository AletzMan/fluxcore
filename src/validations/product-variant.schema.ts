import { z } from "zod";

export const ProductVariantSchema = z.object({
    barcode: z.string().min(1, { message: "El código de barras o identificador es obligatorio" }),
    price: z.number().min(0, { message: "El precio debe ser 0 o mayor" }),
    minStock: z.number().int().min(0, { message: "El inventario mínimo debe ser 0 o mayor" }),
    productMasterId: z.number().int().positive({ message: "ID del producto maestro inválido" })
    // No validamos imageFile dentro de la capa Zod estándar ya que se inyecta via FormData o se omite
});

export type ProductVariantFormValues = z.infer<typeof ProductVariantSchema>;
