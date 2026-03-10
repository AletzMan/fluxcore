"use server";
import { productMasterService } from "../services/api/product-master.service";
import { CreateProductMaster } from "@/typesAPI/product-master";

export const createProductMasterAction = async (data: CreateProductMaster) => {
    try {
        const response = await productMasterService.createProductMaster(data);
        return {
            success: response.success,
            message: response.message || "Producto base creado exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear el producto",
            errorCode: error.errorCode
        };
    }
}
