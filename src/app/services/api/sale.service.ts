import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerPatch } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { Sale } from "@/typesModels/Sale";
import { SaleParams, CreateSale, AddItemSale, RegisterPaymentSale, UpdateSale } from "@/typesAPI/sale.types";

class SaleService {
    async getAllSales(params?: SaleParams): Promise<PagedResponse<Sale>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if (params?.status) queryParams.append("Status", params.status);
        if (params?.fromDate) queryParams.append("FromDate", params.fromDate.toISOString());
        if (params?.toDate) queryParams.append("ToDate", params.toDate.toISOString());
        if (params?.paymentMethod) queryParams.append("PaymentMethod", params.paymentMethod);
        if (params?.creatorId) queryParams.append("CreatorId", params.creatorId.toString());

        return await apiFluxCoreServerGet<PagedResponse<Sale>>(`/sales?${queryParams.toString()}`);
    }

    async getSaleById(id: string | number): Promise<ApiResponse<Sale>> {
        return await apiFluxCoreServerGet<ApiResponse<Sale>>(`/sales/${id}`);
    }
}

export const saleService = new SaleService();
