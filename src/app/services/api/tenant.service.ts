import { GetTenantsParams, RegisterTenantRequest, UpdateTenantRequest } from "@/typesAPI/tenant.types";
import { apiFluxCore, apiFluxCoreServerGet } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { Tenant } from "@/typesModels/Tenant";
import axios from "axios";



class TenantService {

    async getAllTenants(params: GetTenantsParams) {
        try {
            const response = await apiFluxCoreServerGet<PagedResponse<Tenant>>(`/admin/tenants`, { params });
            return response;
        } catch (error) { 
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async getTenantById(id: number): Promise<ApiResponse<Tenant | null> | undefined> {
        try {
            const config = { cache: true, ttl: 120 };
            const response = await apiFluxCoreServerGet<ApiResponse<Tenant>>(`/tenants/${id}`, config as any);
            return response;
        } catch (error) { 
            if (axios.isAxiosError(error)) {
                return undefined;
            }
        }
    }

    async createTenant(tenant: RegisterTenantRequest) {
        const response = await apiFluxCore.post<Tenant>("/admin/tenants", tenant);
        return response.data;
    }

    async updateTenant(id: number, tenant: UpdateTenantRequest) {
        try {
            const formData = new FormData();
            formData.append("currentSubscriptionId", tenant.currentSubscriptionId?.toString() || "");
            formData.append("status", tenant.status?.toString() || "");
            formData.append("companyName", tenant.companyName || "");
            formData.append("taxId", tenant.taxId || "");
            formData.append("address", tenant.address || "");
            formData.append("phone", tenant.phone || "");
            formData.append("email", tenant.email || "");
            formData.append("isActive", tenant.isActive?.toString() || "");
            if (tenant.logoFile) {
                formData.append("logoFile", tenant.logoFile);
            }
            const response = await apiFluxCore.patch<Tenant>(`/tenants/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) { 
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async deleteTenant(id: number) {
        try {
            const response = await apiFluxCore.delete(`/tenants/${id}`);
            return response.data;
        } catch (error) { 
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

}

export const tenantService = new TenantService();