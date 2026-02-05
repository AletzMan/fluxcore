import { GetTenantsParams, RegisterTenantRequest } from "@/typesAPI/tenant.types";
import { apiFluxCore, apiFluxCoreServerGet } from "./axios-instance";
import { PagedResponse } from "@/typesAPI/common.types";
import { Tenant } from "@/typesModels/Tenant";
import axios from "axios";



class TenantService {

    async getAllTenants(params: GetTenantsParams) {
        try {
            const response = await apiFluxCoreServerGet<PagedResponse<Tenant>>(`/admin/tenants`, { params });
            return response;
        } catch (error) {
            console.warn("Error al obtener los tenants:", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async getTenantById(id: number) {
        const response = await apiFluxCore.get<Tenant>(`/admin/tenants/${id}`);
        return response.data;
    }

    async createTenant(tenant: RegisterTenantRequest) {
        const response = await apiFluxCore.post<Tenant>("/admin/tenants", tenant);
        return response.data;
    }

    async updateTenant(id: number, tenant: RegisterTenantRequest) {
        const response = await apiFluxCore.put<Tenant>(`/admin/tenants/${id}`, tenant);
        return response.data;
    }

    async deleteTenant(id: number) {
        const response = await apiFluxCore.delete(`/admin/tenants/${id}`);
        return response.data;
    }

}

export const tenantService = new TenantService();