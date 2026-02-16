'use server';

import { apiFluxCoreServerPost } from "@/app/services/api/axios-instance";
import { CreatePlan } from "@/typesAPI/plan.types";
import { revalidatePath } from "next/cache";

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
