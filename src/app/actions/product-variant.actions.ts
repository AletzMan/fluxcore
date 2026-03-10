"use server";
import { productVariantService } from "../services/api/product-variant.service";

export const createProductVariantAction = async (formData: FormData) => {
    try {
        const barcode = formData.get("barcode") as string;
        const priceStr = formData.get("price") as string;
        const minStockStr = formData.get("minStock") as string;
        const productMasterIdStr = formData.get("productMasterId") as string;
        const imageFile = formData.get("imageFile") as File | null;

        if (!barcode || !priceStr || !minStockStr || !productMasterIdStr) {
             return { success: false, message: "Faltan campos obligatorios" };
        }

        const data = {
            barcode,
            price: Number(priceStr),
            minStock: Number(minStockStr),
            productMasterId: Number(productMasterIdStr),
            imageFile: imageFile && imageFile.name ? imageFile : undefined
        };

        const response = await productVariantService.createProductVariant(data);
        return {
            success: response.success,
            message: response.message || "Variante creada exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear la variante",
            errorCode: error.errorCode
        };
    }
}

export const updateProductVariantAction = async (id: number, formData: FormData) => {
    try {
        const barcode = formData.get("barcode") as string;
        const priceStr = formData.get("price") as string;
        const minStockStr = formData.get("minStock") as string;
        const productMasterIdStr = formData.get("productMasterId") as string;
        const imageFile = formData.get("imageFile") as File | null;

        if (!barcode || !priceStr || !minStockStr || !productMasterIdStr) {
             return { success: false, message: "Faltan campos obligatorios" };
        }

        const data = {
            barcode,
            price: Number(priceStr),
            minStock: Number(minStockStr),
            productMasterId: Number(productMasterIdStr),
            imageFile: imageFile && imageFile.name ? imageFile : undefined
        };

        const response = await productVariantService.updateProductVariant(id, data);
        return {
            success: response.success,
            message: response.message || "Variante actualizada exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al actualizar la variante",
            errorCode: error.errorCode
        };
    }
}
