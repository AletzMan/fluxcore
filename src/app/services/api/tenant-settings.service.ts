import { apiFluxCoreServerGet, apiFluxCoreServerPatch } from "./axios-instance";
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
        formData.append("companyName", data.companyName);
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
        let payload: any = data;
        let headers = {};

        if (data.logoFile) {
            const formData = new FormData();
            formData.append("logoFile", data.logoFile);
            payload = formData;
            headers = { "Content-Type": "multipart/form-data" };
        }

        const response = await apiFluxCoreServerPatch<ApiResponse<TenantSettings>>("/tenant-admin/settings", payload, {
            headers
        });
        return response as ApiResponse<TenantSettings>;
    }
}

export const tenantSettingsService = new TenantSettingsService();
