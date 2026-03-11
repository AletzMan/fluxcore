import { apiFluxCoreServerGet, apiFluxCoreServerPost, apiFluxCoreServerPut, apiFluxCoreServerPatch } from "./axios-instance";
import { PagedResponse, ApiResponse } from "@/typesAPI/common.types";
import { Employee } from "@/typesModels/Employee";
import { EmployeeParams, EmployeeCreate, EmployeeUpdate } from "@/typesAPI/employee.types";

class EmployeeService {
    async getEmployees(params?: EmployeeParams): Promise<PagedResponse<Employee>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if (params?.role) queryParams.append("Role", params.role.toString());

        const response = await apiFluxCoreServerGet<PagedResponse<Employee>>(`/employees?${queryParams.toString()}`);
        return response as PagedResponse<Employee>;
    }

    async getEmployeeById(id: number): Promise<ApiResponse<Employee>> {
        const response = await apiFluxCoreServerGet<ApiResponse<Employee>>(`/employees/${id}`);
        return response as ApiResponse<Employee>;
    }

    async createEmployee(data: EmployeeCreate): Promise<ApiResponse<Employee>> {
        const response = await apiFluxCoreServerPost<ApiResponse<Employee>>(`/employees`, data);
        return response as ApiResponse<Employee>;
    }

    async updateEmployee(id: number, data: EmployeeUpdate): Promise<ApiResponse<Employee>> {
        const response = await apiFluxCoreServerPut<ApiResponse<Employee>>(`/employees/${id}`, data);
        return response as ApiResponse<Employee>;
    }

    async deactivateEmployee(id: number): Promise<ApiResponse<null>> {
        const response = await apiFluxCoreServerPatch<ApiResponse<null>>(`/employees/${id}/deactivate`, {});
        return response as ApiResponse<null>;
    }
}

export const employeeService = new EmployeeService();
