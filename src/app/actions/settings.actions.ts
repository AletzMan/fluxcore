'use server';

import {  apiFluxCoreServerPut } from "@/app/services/api/axios-instance";
import { ToggleMaintenanceRequest } from "@/typesAPI/settings";
import { revalidatePath } from "next/cache";
import { cacheService } from "@/app/services/cache.service";

export async function toggleMaintenanceAction(data: ToggleMaintenanceRequest): Promise<any> {
    try {
        const response = await apiFluxCoreServerPut(`/admin/settings/maintenance`, data); 
        cacheService.invalidateKeysByPattern(`get:/admin/settings`);

        revalidatePath('/admin/settings');

        return response;
    } catch (error: any) { 
        return {
            success: false,
            message: error.message || "Error al cambiar el modo de mantenimiento"
        };
    }
}
