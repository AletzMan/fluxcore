import { CreatePlan, GetPlansParams, UpdatePlan } from "@/typesAPI/plan.types";
import { apiFluxCore, apiFluxCoreServerGet } from "./axios-instance";
import { PagedResponse } from "@/typesAPI/common.types";
import { Plan } from "@/typesModels/Plan";
import axios from "axios";

class PlanService {

    async getAllPlans(params: GetPlansParams) {
        try {
            const response = await apiFluxCoreServerGet<PagedResponse<Plan>>(`/admin/plans`, { params });
            return response;
        } catch (error) {
            console.warn("Error al obtener los planes:", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async getPlanById(id: number) {
        const response = await apiFluxCore.get<Plan>(`/admin/plans/${id}`);
        return response.data;
    }

    async createPlan(plan: CreatePlan) {
        const response = await apiFluxCore.post<Plan>("/admin/plans", plan);
        return response.data;
    }

    async updatePlan(id: number, plan: UpdatePlan) {
        const response = await apiFluxCore.put<Plan>(`/admin/plans/${id}`, plan);
        return response.data;
    }

    async deletePlan(id: number) {
        const response = await apiFluxCore.delete(`/admin/plans/${id}`);
        return response.data;
    }

}

export const planService = new PlanService();