"use server";
import { providerService } from "../services/api/provider.service";
import { CreateProvider, UpdateProvider } from "@/typesAPI/provider.types";
import { apiFluxCoreServerPatch } from "@/app/services/api/axios-instance";
import { Provider } from "@/typesModels/Provider";
import { cacheService } from "@/app/services/cache.service";
import { revalidatePath } from "next/cache";

export const createProviderAction = async (data: CreateProvider) => {
    try {
        const response = await providerService.createProvider(data) as any;
        
        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al crear el proveedor",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Proveedor creado exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al crear el proveedor",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}

export const updateProviderAction = async (id: number, data: UpdateProvider) => {
    try {
        const response = await providerService.updateProvider(id, data) as any;
        
        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Ocurrió un error al actualizar el proveedor",
                errorCode: response.errorCode,
                fieldErrors: response.fieldErrors as Record<string, string> | undefined
            };
        }

        return {
            success: response.success,
            message: response.message || "Proveedor actualizado exitosamente",
            data: response.data
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Ocurrió un error al actualizar el proveedor",
            errorCode: error.errorCode,
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}

export async function updateProviderSectionAction(id: number, data: Partial<Provider>): Promise<any> {
    try {
        const response = await apiFluxCoreServerPatch(`/providers/${id}`, data);

        // Limpiar el caché en memoria del servidor
        cacheService.invalidateKeysByPattern(`get:/providers/${id}`);
        cacheService.invalidateKeysByPattern(`get:/providers:`);

        // Revalidar las rutas de Next.js
        revalidatePath(`/personas/proveedores/${id}`);
        revalidatePath('/personas/proveedores');

        return response;
    } catch (error: any) {
        console.error("Error in updateProviderSectionAction:", error);
        return {
            success: false,
            message: error.message || "Error al actualizar el proveedor",
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}
