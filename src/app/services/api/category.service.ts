import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerDelete, apiFluxCoreServerPatch } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { Category } from "@/typesModels/Category";
import { CategoryParams, CreateCategory, UpdateCategory } from "@/typesAPI/category.types";

class CategoryService {
    async getAllCategories(params?: Partial<CategoryParams>): Promise<PagedResponse<Category>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if(params?.sortBy) queryParams.append("SortBy", params.sortBy);
        if(params?.sortDirection) queryParams.append("SortDirection", params.sortDirection);
        
        return await apiFluxCoreServerGet<PagedResponse<Category>>(`/categories?${queryParams.toString()}`) as PagedResponse<Category>;
    }

    async getCategoryById(id: string | number): Promise<ApiResponse<Category>> {
        return await apiFluxCoreServerGet<ApiResponse<Category>>(`/categories/${id}`) as ApiResponse<Category>;
    }

    async createCategory(data: CreateCategory): Promise<ApiResponse<Category>> {
        return await apiFluxCoreServerPost<ApiResponse<Category>>(`/categories`, data) as ApiResponse<Category>;
    }

    async updateCategory(id: string | number, data: UpdateCategory): Promise<ApiResponse<Category>> {
        return await apiFluxCoreServerPatch<ApiResponse<Category>>(`/categories/${id}`, data) as ApiResponse<Category>;
    }

    async deleteCategory(id: string | number): Promise<ApiResponse<null>> {
        return await apiFluxCoreServerDelete<ApiResponse<null>>(`/categories/${id}`) as ApiResponse<null>;
    }
}

export const categoryService = new CategoryService();
