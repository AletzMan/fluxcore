import { CreatePlan, GetPlansParams, UpdatePlan } from "@/typesAPI/plan.types";
import { apiFluxCore, apiFluxCoreServerGet } from "./axios-instance";
import { PagedResponse } from "@/typesAPI/common.types";
import { Plan } from "@/typesModels/Plan";
import axios from "axios";

import { cacheService } from "../cache.service";

class PlanService {

    async getAllPlans(params: GetPlansParams) {
        try {
            const config = { params, cache: true, ttl: 120 };
            const response = await apiFluxCoreServerGet<PagedResponse<Plan>>(`/plans`, config as any);
            return response;
        } catch (error) {
            console.warn("Error al obtener los planes:", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async getPlanById(id: number) {
        const response = await apiFluxCore.get<Plan>(`/plans/${id}`);
        return response.data;
    }

    async createPlan(plan: CreatePlan) {
        const response = await apiFluxCore.post<Plan>("/plans", plan);
        cacheService.invalidateKeysByPattern('get:/plans'); // Invalidate cache
        return response.data;
    }

    async updatePlan(id: number, plan: UpdatePlan) {
        const response = await apiFluxCore.put<Plan>(`/plans/${id}`, plan);
        cacheService.invalidateKeysByPattern('get:/plans'); // Invalidate cache
        return response.data;
    }

    async deletePlan(id: number) {
        const response = await apiFluxCore.delete(`/plans/${id}`);
        cacheService.invalidateKeysByPattern('get:/plans'); // Invalidate cache
        return response.data;
    }

}

export const planService = new PlanService();