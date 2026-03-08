import { apiFluxCoreServerGet } from "./axios-instance";
import { ApiResponse } from "@/typesAPI/common.types";
import { TenantDashboardSummary } from "@/typesModels/TenantSummary";

class TenantDashboardService {
    
    async getTenantDashboardSummary(): Promise<ApiResponse<TenantDashboardSummary>> {
        const response = await apiFluxCoreServerGet<ApiResponse<TenantDashboardSummary>>("/tenant-admin/dashboard/summary");
        return response as ApiResponse<TenantDashboardSummary>;
    }

}

export const tenantDashboardService = new TenantDashboardService();
