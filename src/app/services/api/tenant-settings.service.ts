import { apiFluxCoreServerGet, apiFluxCoreServerPatch, apiFluxCore } from "./axios-instance";
import { ApiResponse } from "@/typesAPI/common.types";
import { TenantSettings } from "@/typesModels/TenantSettings";
import { UpdateTenantSettings } from "@/typesAPI/tenants-settings.types";

class TenantSettingsService {
    async getMyTenantSettings(): Promise<ApiResponse<TenantSettings>> {
        const response = await apiFluxCoreServerGet<ApiResponse<TenantSettings>>("/tenant-admin/settings");
        return response as ApiResponse<TenantSettings>;
    }

    async updateTenantSettings(data: UpdateTenantSettings): Promise<ApiResponse<TenantSettings>> {
        const formData = new FormData();
        
        if (data.companyName) formData.append("companyName", data.companyName);
        if (data.taxId) formData.append("taxId", data.taxId);
        if (data.address) formData.append("address", data.address);
        if (data.phone) formData.append("phone", data.phone);
        if (data.email) formData.append("email", data.email);
        if (data.logoFile) {
            formData.append("logoFile", data.logoFile);
        }

        const response = await apiFluxCoreServerPatch<ApiResponse<TenantSettings>>("/tenant-admin/settings", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response as ApiResponse<TenantSettings>;
    }

    // Para actualizaciones parciales por sección
    async updateTenantSettingsSection(data: Partial<UpdateTenantSettings>): Promise<ApiResponse<TenantSettings>> {
        console.log("Service received data for section update:");
        console.dir(data, { depth: null });

        const formData = new FormData();
        
        // Siempre usamos FormData por si hay archivos y por consistencia con el backend
        Object.entries(data).forEach(([key, value]) => {
            if (value !== "" && value !== undefined && value !== null) {
                if (value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, String(value));
                }
            }
        });

        console.log("FormData entries to send:");
        formData.forEach((value, key) => console.log(`${key}: ${value}`));

        const response = await apiFluxCoreServerPatch<ApiResponse<TenantSettings>>("/tenant-admin/settings", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        console.log("API Response in Service:", response);
        return response as ApiResponse<TenantSettings>;
    }
    // Recibe FormData nativo (igual que brandService.createBrand) para preservar el File
    // en el Server Action. El llamador es responsable de incluir companyName en el formData.
    async uploadTenantLogoFormData(formData: FormData): Promise<ApiResponse<TenantSettings>> {
        const response = await apiFluxCoreServerPatch<ApiResponse<TenantSettings>>(
            "/tenant-admin/settings",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response as ApiResponse<TenantSettings>;
    }

    // ⚠️ Método cliente: los File no pueden cruzar Server Actions — se sube directamente desde el browser
    async uploadTenantLogo(logoFile: File, companyName: string): Promise<ApiResponse<TenantSettings>> {
        const formData = new FormData();
        formData.append("logoFile", logoFile);
        formData.append("companyName", companyName); // requerido por backend

        const response = await apiFluxCore.patch<ApiResponse<TenantSettings>>(
            "/tenant-admin/settings",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    }
}

export const tenantSettingsService = new TenantSettingsService();
