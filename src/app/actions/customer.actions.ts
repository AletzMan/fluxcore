"use server";
import { customerService } from "../services/api/customer.service";
import { CreateCustomer, UpdateCustomer } from "@/typesAPI/customer-types";

export const createCustomerAction = async (data: CreateCustomer) => {
    try {
        const response = await customerService.createCustomer(data) as any;
        
        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al crear el cliente",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Cliente creado exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear el cliente",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}

export const updateCustomerAction = async (id: number, data: UpdateCustomer) => {
    try {
        const response = await customerService.updateCustomer(id, data) as any;
        
        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al actualizar el cliente",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Cliente actualizado exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al actualizar el cliente",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}
