import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerPut, apiFluxCoreServerPatch } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { Customer } from "@/typesModels/Customer";
import { CustomerParams, CreateCustomer, UpdateCustomer } from "@/typesAPI/customer-types";

class CustomerService {
    async getCustomers(params?: CustomerParams): Promise<PagedResponse<Customer>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if(params?.sortBy) queryParams.append("SortBy", params.sortBy);
        if(params?.sortDirection) queryParams.append("SortDirection", params.sortDirection);
        if (params?.isActive !== undefined) queryParams.append("IsActive", params.isActive.toString());
        if (params?.taxRegime !== undefined) queryParams.append("TaxRegime", params.taxRegime.toString());
        if (params?.cfdiUsage !== undefined) queryParams.append("CfdiUsage", params.cfdiUsage.toString());
        if (params?.hasBalance !== undefined) queryParams.append("HasBalance", params.hasBalance.toString());
        if (params?.zipCode) queryParams.append("ZipCode", params.zipCode);

        console.log("URL: ", `/customers?${queryParams.toString()}`);
        const response = await apiFluxCoreServerGet<PagedResponse<Customer>>(`/customers?${queryParams.toString()}`);
        return response as PagedResponse<Customer>;
    }

    async getCustomerById(id: number): Promise<ApiResponse<Customer>> {
        const response = await apiFluxCoreServerGet<ApiResponse<Customer>>(`/customers/${id}`);
        return response as ApiResponse<Customer>;
    }

    async createCustomer(data: CreateCustomer): Promise<ApiResponse<Customer>> {
        const response = await apiFluxCoreServerPost<ApiResponse<Customer>>(`/customers`, data);
        return response as ApiResponse<Customer>;
    }

    async updateCustomer(id: number, data: UpdateCustomer): Promise<ApiResponse<Customer>> {
        const response = await apiFluxCoreServerPut<ApiResponse<Customer>>(`/customers/${id}`, data);
        return response as ApiResponse<Customer>;
    }

    async deactivateCustomer(id: number): Promise<ApiResponse<null>> {
        // Asumiendo que existe un endpoint PATCH para desactivado logico, de lo contrario sera con el update
        const response = await apiFluxCoreServerPatch<ApiResponse<null>>(`/customers/${id}/deactivate`, {});
        return response as ApiResponse<null>;
    }
}

export const customerService = new CustomerService();
