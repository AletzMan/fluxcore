"use server";
import { tenantSettingsService } from "../services/api/tenant-settings.service";
import { UpdateTenantSettings } from "@/typesAPI/tenants-settings.types";
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

// Acción específica para subir el logo — recibe FormData directamente
// para que el File sobreviva la serialización del Server Action de Next.js
export async function uploadTenantLogoAction(formData: FormData) {
    try {
        const response = await tenantSettingsService.uploadTenantLogoFormData(formData) as any;

        if (response.success === false) {
            return {
                success: false,
                message: response.message || "Error al subir el logo",
                fieldErrors: response.fieldErrors
            };
        }

        cacheService.invalidateKeysByPattern(`get:/tenants/my-tenant`);
        revalidatePath('/configuracion');

        return { success: true, message: "Logo actualizado correctamente", data: response.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Error al subir el logo",
        };
    }
}
