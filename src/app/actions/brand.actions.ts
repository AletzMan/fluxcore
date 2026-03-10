"use server";
import { brandService } from "../services/api/brand.service";

export const createBrandAction = async (formData: FormData) => {
    try {
        const response = await brandService.createBrand(formData) as any;
        
        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al crear la marca",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Marca creada exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear la marca",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}

export const updateBrandAction = async (id: number, formData: FormData) => {
    try {
        const response = await brandService.updateBrand(id, formData) as any;
        
        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al actualizar la marca",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Marca actualizada exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al actualizar la marca",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}
