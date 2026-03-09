import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerPatch } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { CashSession } from "@/typesModels/CashSession";
import { CashSessionParams, OpenCashSession, CloseCashSession } from "@/typesAPI/cash-session.types";

class CashSessionService {
    async getAllSessions(params?: CashSessionParams): Promise<PagedResponse<CashSession>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if (params?.status) queryParams.append("Status", params.status);
        if (params?.fromDate) queryParams.append("FromDate", params.fromDate.toISOString());
        if (params?.toDate) queryParams.append("ToDate", params.toDate.toISOString());
        if (params?.onlyWithDiscrepancies) queryParams.append("OnlyWithDiscrepancies", "true");
        if (params?.userId) queryParams.append("UserId", params.userId.toString());

        return await apiFluxCoreServerGet<PagedResponse<CashSession>>(`/cash-sessions?${queryParams.toString()}`) as PagedResponse<CashSession>;
    }

    async getSessionById(id: string | number): Promise<ApiResponse<CashSession>> {
        return await apiFluxCoreServerGet<ApiResponse<CashSession>>(`/cash-sessions/${id}`) as ApiResponse<CashSession>;
    }

    async openSession(data: OpenCashSession): Promise<ApiResponse<CashSession>> {
        return await apiFluxCoreServerPost<ApiResponse<CashSession>>(`/cash-sessions`, data) as ApiResponse<CashSession>;
    }

    async closeSession(id: string | number, data: CloseCashSession): Promise<ApiResponse<CashSession>> {
        return await apiFluxCoreServerPatch<ApiResponse<CashSession>>(`/cash-sessions/${id}/close`, data) as ApiResponse<CashSession>;
    }
}

export const cashSessionService = new CashSessionService();
