import { CreatePlan, GetPlansParams, UpdatePlan } from "@/typesAPI/plan.types";
import { apiFluxCore, apiFluxCoreServerGet, apiFluxCorePost } from "./axios-instance";
import { ApiResponse, PagedResponse } from "@/typesAPI/common.types";
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

    async getPlanById(id: number): Promise<Plan | undefined | null> {
        try {
            const config = { cache: true, ttl: 120 };
            console.log("id", id);
            const response = await apiFluxCoreServerGet<ApiResponse<Plan>>(`/plans/${id}`, config as any);
            console.log("response", response);
            return response.data;
        } catch (error) {
            console.warn("Error al obtener el plan:", error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async createPlan(plan: CreatePlan) {
        const response = await apiFluxCorePost<Plan>("/plans", plan);
        cacheService.invalidateKeysByPattern('get:/plans'); // Invalidate cache
        return response;
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