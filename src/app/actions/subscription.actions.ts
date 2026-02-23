'use server';

import { apiFluxCoreServerPost, apiFluxCoreServerPatch } from "@/app/services/api/axios-instance";
import { CreateSubscription, UpdateSubscription } from "@/typesAPI/subscription.types";
import { revalidatePath } from "next/cache";
import { cacheService } from "@/app/services/cache.service";

export async function createSubscriptionAction(data: CreateSubscription): Promise<any> {
    try {
        const response = await apiFluxCoreServerPost("/admin/subscriptions", data);
        revalidatePath('/admin/subscriptions'); 
        return response;
    } catch (error: any) {
        console.error("Error in createSubscriptionAction:", error);
        return {
            success: false,
            message: error.message || "Error al crear la suscripción"
        };
    }
}

export async function updateSubscriptionAction(id: number, data: UpdateSubscription): Promise<any> {
    try {
        const response = await apiFluxCoreServerPatch(`/subscriptions/${id}`, data);

        cacheService.invalidateKeysByPattern(`get:/subscriptions/${id}`);
        cacheService.invalidateKeysByPattern(`get:/admin/subscriptions:`);

        revalidatePath(`/admin/subscriptions/${id}`);
        revalidatePath('/admin/subscriptions');

        return response;
    } catch (error: any) {
        console.error("Error in updateSubscriptionAction:", error);
        return {
            success: false,
            message: error.message || "Error al actualizar la suscripción"
        };
    }
}

export async function invalidateSubscriptionCache(id: number) {
    cacheService.invalidateKeysByPattern(`get:/subscriptions/${id}`);
    cacheService.invalidateKeysByPattern(`get:/admin/subscriptions:`);
    revalidatePath(`/admin/subscriptions/${id}`);
    revalidatePath('/admin/subscriptions');
}
