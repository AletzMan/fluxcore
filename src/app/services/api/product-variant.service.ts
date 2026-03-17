import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerPut, apiFluxCoreServerDelete } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { ProductVariant } from "@/typesModels/ProductVariant";
import { ProductVariantParams, CreateProductVariant, UpdateProductVariant } from "@/typesAPI/product-variant";

class ProductVariantService {
    async getAllProductVariants(params?: ProductVariantParams): Promise<PagedResponse<ProductVariant>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if (params?.productMaster) queryParams.append("ProductMaster", params.productMaster.toString());
        if(params?.sortBy) queryParams.append("SortBy", params.sortBy);
        if(params?.sortDirection) queryParams.append("SortDirection", params.sortDirection);
        
        return await apiFluxCoreServerGet<PagedResponse<ProductVariant>>(`/product-variants?${queryParams.toString()}`) as PagedResponse<ProductVariant>;
    }

    async getProductVariantById(id: string | number): Promise<ApiResponse<ProductVariant>> {
        return await apiFluxCoreServerGet<ApiResponse<ProductVariant>>(`/product-variants/${id}`) as ApiResponse<ProductVariant>;
    }

    async createProductVariant(data: CreateProductVariant): Promise<ApiResponse<ProductVariant>> {
        const formData = new FormData();
        formData.append("barcode", data.barcode);
        formData.append("price", data.price.toString());
        formData.append("minStock", data.minStock.toString());
        formData.append("productMasterId", data.productMasterId.toString());
        if (data.imageFile) {
            formData.append("imageFile", data.imageFile);
        }

        return await apiFluxCoreServerPost<ApiResponse<ProductVariant>>(`/product-variants`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }) as ApiResponse<ProductVariant>;
    }

    async updateProductVariant(id: string | number, data: UpdateProductVariant): Promise<ApiResponse<ProductVariant>> {
        const formData = new FormData();
        if (data.barcode) formData.append("barcode", data.barcode);
        if (data.price !== undefined) formData.append("price", data.price.toString());
        if (data.minStock !== undefined) formData.append("minStock", data.minStock.toString());
        if (data.productMasterId !== undefined) formData.append("productMasterId", data.productMasterId.toString());
        if (data.imageFile) {
            formData.append("imageFile", data.imageFile);
        }

        return await apiFluxCoreServerPut<ApiResponse<ProductVariant>>(`/product-variants/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }) as ApiResponse<ProductVariant>;
    }

    async deleteProductVariant(id: string | number): Promise<ApiResponse<null>> {
        return await apiFluxCoreServerDelete<ApiResponse<null>>(`/product-variants/${id}`) as ApiResponse<null>;
    }
}

export const productVariantService = new ProductVariantService();
