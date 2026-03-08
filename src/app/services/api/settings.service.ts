import { apiFluxCoreServerGet, apiFluxCoreServerPost } from "./axios-instance";
import { ApiResponse } from "@/typesAPI/common.types";
import { SystemSettingsResponse } from "@/typesModels/Settings";
import { ToggleMaintenanceRequest } from "@/typesAPI/settings.types";

class SettingsService {

    async getSettings(): Promise<ApiResponse<SystemSettingsResponse | null> | undefined> {
        const config = { cache: false };
        const response = await apiFluxCoreServerGet<ApiResponse<SystemSettingsResponse>>(
            `/admin/settings`,
            config as any
        );
        return response;
    }

    async toggleMaintenance(data: ToggleMaintenanceRequest): Promise<ApiResponse<any> | undefined> {
        const response = await apiFluxCoreServerPost<ApiResponse<any>>(
            `/admin/settings/maintenance`,
            data
        );
        return response;
    }

}

export const settingsService = new SettingsService();
