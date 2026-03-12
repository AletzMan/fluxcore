"use server";
import { tenantSettingsService } from "../services/api/tenant-settings.service";
import { UpdateTenantSettings } from "@/typesAPI/tenants-settings.types";
import { TenantSettings } from "@/typesModels/TenantSettings";
import { cacheService } from "@/app/services/cache.service";
import { revalidatePath } from "next/cache";

export async function updateTenantSettingsAction(data: UpdateTenantSettings) {
    try {
        const response = await tenantSettingsService.updateTenantSettings(data);
        
        cacheService.invalidateKeysByPattern(`get:/tenants/my-tenant`);
        revalidatePath('/configuracion');

        return response;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Error al actualizar la configuración",
            fieldErrors: error.fieldErrors
        };
    }
}

export async function updateTenantSettingsSectionAction(id: number | string, data: Partial<UpdateTenantSettings>) {
    try {
        const response = await tenantSettingsService.updateTenantSettingsSection(data);

        cacheService.invalidateKeysByPattern(`get:/tenants/my-tenant`);
        revalidatePath('/configuracion');

        return response;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Error al actualizar la sección",
            fieldErrors: error.fieldErrors
        };
    }
}
