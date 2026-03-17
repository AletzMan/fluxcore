import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerDelete, apiFluxCoreServerPatch } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { Brand } from "@/typesModels/Brand";
import { BrandParams } from "@/typesAPI/brand.type";

class BrandService {
    async getAllBrands(params?: BrandParams): Promise<PagedResponse<Brand>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if(params?.sortBy) queryParams.append("SortBy", params.sortBy);
        if(params?.sortDirection) queryParams.append("SortDirection", params.sortDirection);
        
        return await apiFluxCoreServerGet<PagedResponse<Brand>>(`/brands?${queryParams.toString()}`) as PagedResponse<Brand>;
    }

    async getBrandById(id: string | number): Promise<ApiResponse<Brand>> {
        return await apiFluxCoreServerGet<ApiResponse<Brand>>(`/brands/${id}`) as ApiResponse<Brand>;
    }

    async createBrand(data: FormData): Promise<ApiResponse<Brand>> {
        return await apiFluxCoreServerPost<ApiResponse<Brand>>(`/brands`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }) as ApiResponse<Brand>;
    }

    async updateBrand(id: string | number, data: FormData): Promise<ApiResponse<Brand>> {
        return await apiFluxCoreServerPatch<ApiResponse<Brand>>(`/brands/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }) as ApiResponse<Brand>;
    }

    async deleteBrand(id: string | number): Promise<ApiResponse<null>> {
        return await apiFluxCoreServerDelete<ApiResponse<null>>(`/brands/${id}`) as ApiResponse<null>;
    }
}

export const brandService = new BrandService();
