import { apiFluxCoreServerGet } from "./axios-instance";
import { ApiResponse } from "@/typesAPI/common.types";
import { DashboardSummary } from "@/typesModels/summary";

class SummaryService {

    async getDashboardSummary(): Promise<ApiResponse<DashboardSummary | null> | undefined> {
        const config = { cache: true, ttl: 60 };
        const response = await apiFluxCoreServerGet<ApiResponse<DashboardSummary>>(
            `/admin/dashboard/summary`,
            config as any
        );
        console.log("responseSummary", response);
        return response;
    }

}

export const summaryService = new SummaryService();
