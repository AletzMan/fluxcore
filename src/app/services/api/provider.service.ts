import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerPut, apiFluxCoreServerPatch } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { Provider } from "@/typesModels/Provider";
import { ProviderParams, CreateProvider, UpdateProvider } from "@/typesAPI/provider.types";

class ProviderService {
    async getProviders(params?: ProviderParams): Promise<PagedResponse<Provider>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if(params?.sortBy) queryParams.append("SortBy", params.sortBy);
        if(params?.sortDirection) queryParams.append("SortDirection", params.sortDirection);

        const response = await apiFluxCoreServerGet<PagedResponse<Provider>>(`/providers?${queryParams.toString()}`);
        return response as PagedResponse<Provider>;
    }

    async getProviderById(id: number): Promise<ApiResponse<Provider>> {
        const response = await apiFluxCoreServerGet<ApiResponse<Provider>>(`/providers/${id}`);
        return response as ApiResponse<Provider>;
    }

    async createProvider(data: CreateProvider): Promise<ApiResponse<Provider>> {
        const response = await apiFluxCoreServerPost<ApiResponse<Provider>>(`/providers`, data);
        return response as ApiResponse<Provider>;
    }

    async updateProvider(id: number, data: UpdateProvider): Promise<ApiResponse<Provider>> {
        const response = await apiFluxCoreServerPut<ApiResponse<Provider>>(`/providers/${id}`, data);
        return response as ApiResponse<Provider>;
    }

    async deleteProvider(id: number): Promise<ApiResponse<null>> {
        // Asumiendo que existe un endpoint PATCH o DELETE
        const response = await apiFluxCoreServerPatch<ApiResponse<null>>(`/providers/${id}/deactivate`, {});
        return response as ApiResponse<null>;
    }
}

export const providerService = new ProviderService();
