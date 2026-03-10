"use server";
import { categoryService } from "../services/api/category.service";
import { CreateCategory } from "@/typesAPI/category.types";

export const createCategoryAction = async (data: CreateCategory) => {
    try {
        const response = await categoryService.createCategory(data);
        return {
            success: response.success,
            message: response.message || "Categoría creada exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear la categoría",
            errorCode: error.errorCode
        };
    }
}
