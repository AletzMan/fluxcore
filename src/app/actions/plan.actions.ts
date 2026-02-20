'use server';

import { apiFluxCoreServerPost, apiFluxCoreServerPatch } from "@/app/services/api/axios-instance";
import { CreatePlan, UpdatePlan } from "@/typesAPI/plan.types";
import { revalidatePath } from "next/cache";
import { cacheService } from "@/app/services/cache.service";
import { planService } from "@/app/services/api/plan.service";

export async function createPlanAction(data: CreatePlan): Promise<any> {
    try {
        // Esta función corre en el servidor, donde apiFluxCoreServerPost
        // sí puede leer las cookies y adjuntar el token.
        const response = await apiFluxCoreServerPost("/plans", {
            ...data,
            features: data.features || ''
        });

        // Revalidamos las rutas necesarias
        revalidatePath('/admin/plans'); 

        return response;
    } catch (error: any) {
        console.error("Error in createPlanAction:", error);
        return {
            success: false,
            message: error.message || "Error al crear el plan"
        };
    }
}
export async function updatePlanAction(id: number, data: UpdatePlan): Promise<any> {
    try {
        const response = await apiFluxCoreServerPatch(`/plans/${id}`, data);

        // Limpiamos el caché en memoria del servidor
        cacheService.invalidateKeysByPattern(`get:/plans/${id}`);
        cacheService.invalidateKeysByPattern(`get:/plans:`);

        // Revalidamos las rutas de Next.js
        revalidatePath(`/admin/plans/${id}`);
        revalidatePath('/admin/plans');

        return response;
    } catch (error: any) {
        console.error("Error in updatePlanAction:", error);
        return {
            success: false,
            message: error.message || "Error al actualizar el plan"
        };
    }
}

export async function invalidatePlanCache(id: number) {
    cacheService.invalidateKeysByPattern(`get:/plans/${id}`);
    cacheService.invalidateKeysByPattern(`get:/plans:`);
    revalidatePath(`/admin/plans/${id}`);
    revalidatePath('/admin/plans');
}
