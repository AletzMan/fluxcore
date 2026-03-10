"use server";
import { categoryService } from "../services/api/category.service";
import { CreateCategory } from "@/typesAPI/category.types";

export const createCategoryAction = async (data: CreateCategory) => {
    try {
        const response = await categoryService.createCategory(data) as any;

        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al crear la categoría",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Categoría creada exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear la categoría",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}

export const updateCategoryAction = async (id: number, data: CreateCategory) => {
    try {
        const response = await categoryService.updateCategory(id, data) as any;

        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al actualizar la categoría",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Categoría actualizada exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al actualizar la categoría",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}
