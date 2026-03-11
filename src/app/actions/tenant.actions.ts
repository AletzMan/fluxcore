'use server';

import { apiFluxCoreServerPatch, apiFluxCoreServerPost } from "@/app/services/api/axios-instance";
import { Tenant } from "@/typesModels/Tenant";
import { RegisterTenantRequest } from "@/typesAPI/tenant.types";
import { revalidatePath } from "next/cache";
import { cacheService } from "@/app/services/cache.service";

export async function createTenantAction(data: RegisterTenantRequest): Promise<any> {
    try {
        const response = await apiFluxCoreServerPost(`/tenants`, data);

        cacheService.invalidateKeysByPattern(`get:/tenants`);
        revalidatePath('/tenants');

        return response;
    } catch (error: any) {
        console.error("Error in createTenantAction:", error);
        return {
            success: false,
            message: error.message || "Error al crear el tenant",
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}

export async function updateTenantAction(id: number, data: Partial<Tenant>): Promise<any> {
    try {
        console.log("dataUpdateTenant", data);
        const response = await apiFluxCoreServerPatch(`/tenants/${id}`, data);

        // Limpiar el caché en memoria del servidor
        cacheService.invalidateKeysByPattern(`get:/tenants/${id}`);
        cacheService.invalidateKeysByPattern(`get:/tenants:`);

        // Revalidar las rutas de Next.js
        revalidatePath(`/tenants/${id}`);
        revalidatePath('/tenants');

        return response;
    } catch (error: any) {
        console.error("Error in updateTenantAction:", error);
        return {
            success: false,
            message: error.message || "Error al actualizar el tenant",
            fieldErrors: error.fieldErrors as Record<string, string> | undefined
        };
    }
}
