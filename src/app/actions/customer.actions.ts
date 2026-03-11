"use server";
import { customerService } from "../services/api/customer.service";
import { CreateCustomer, UpdateCustomer } from "@/typesAPI/customer-types";
import { apiFluxCoreServerPatch } from "@/app/services/api/axios-instance";
import { Customer } from "@/typesModels/Customer";
import { cacheService } from "@/app/services/cache.service";
import { revalidatePath } from "next/cache";

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

export async function updateCustomerSectionAction(id: number, data: Partial<Customer>): Promise<any> {
    try {
        const response = await apiFluxCoreServerPatch(`/customers/${id}`, data);

        // Limpiar el caché en memoria del servidor
        cacheService.invalidateKeysByPattern(`get:/customers/${id}`);
        cacheService.invalidateKeysByPattern(`get:/customers:`);

        // Revalidar las rutas de Next.js
        revalidatePath(`/personas/clientes/${id}`);
        revalidatePath('/personas/clientes');

        return response;
    } catch (error: any) {
        console.error("Error in updateCustomerSectionAction:", error);
        return {
            success: false,
            message: error.message || "Error al actualizar el cliente",
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}
