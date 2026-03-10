import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerPut, apiFluxCoreServerDelete } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { ProductMaster } from "@/typesModels/ProductMaster";
import { ProductMasterParams, CreateProductMaster, UpdateProductMaster } from "@/typesAPI/product-master";

class ProductMasterService {
    async getAllProductMasters(params?: ProductMasterParams): Promise<PagedResponse<ProductMaster>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if (params?.categoryId) queryParams.append("CategoryId", params.categoryId.toString());
        
        return await apiFluxCoreServerGet<PagedResponse<ProductMaster>>(`/product-masters?${queryParams.toString()}`) as PagedResponse<ProductMaster>;
    }

    async getProductMasterById(id: string | number): Promise<ApiResponse<ProductMaster>> {
        return await apiFluxCoreServerGet<ApiResponse<ProductMaster>>(`/product-masters/${id}`) as ApiResponse<ProductMaster>;
    }

    async createProductMaster(data: CreateProductMaster): Promise<ApiResponse<ProductMaster>> {
        return await apiFluxCoreServerPost<ApiResponse<ProductMaster>>(`/product-masters`, data) as ApiResponse<ProductMaster>;
    }

    async updateProductMaster(id: string | number, data: UpdateProductMaster): Promise<ApiResponse<ProductMaster>> {
        return await apiFluxCoreServerPut<ApiResponse<ProductMaster>>(`/product-masters/${id}`, data) as ApiResponse<ProductMaster>;
    }

    async deleteProductMaster(id: string | number): Promise<ApiResponse<null>> {
        return await apiFluxCoreServerDelete<ApiResponse<null>>(`/product-masters/${id}`) as ApiResponse<null>;
    }
}

export const productMasterService = new ProductMasterService();
