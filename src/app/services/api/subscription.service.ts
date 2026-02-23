import { CreateSubscription, GetSubscriptionsParams, UpdateSubscription } from "@/typesAPI/subscription.types";
import { apiFluxCore, apiFluxCoreServerGet, apiFluxCorePost, apiFluxCorePatch } from "./axios-instance";
import { ApiResponse, PagedResponse } from "@/typesAPI/common.types";
import { Subscription } from "@/typesModels/Subscription";
import axios from "axios";

import { cacheService } from "../cache.service";

class SubscriptionService {

    async getAllSubscriptions(params: GetSubscriptionsParams) {
        try {
            const config = { params, cache: true, ttl: 120 };
            const response = await apiFluxCoreServerGet<PagedResponse<Subscription>>(`/subscriptions`, config as any);
            return response;
        } catch (error) { 
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async getSubscriptionById(id: number) : Promise<ApiResponse<Subscription | null> | undefined> {
        try {
            const config = { cache: true, ttl: 120 };
            const response = await apiFluxCoreServerGet<ApiResponse<Subscription>>(`/subscriptions/${id}`, config as any); 
            return response;
        } catch (error) { 
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    }

    async createSubscription(subscription: CreateSubscription) {
        const response = await apiFluxCorePost<Subscription>("/subscriptions", subscription);
        cacheService.invalidateKeysByPattern('get:/admin/subscriptions'); // Invalidate cache
        return response;
    }

    async updateSubscriptionPatch(id: number, subscription: UpdateSubscription) {
        const response = await apiFluxCorePatch<Subscription>(`/subscriptions/${id}`, subscription);
        cacheService.invalidateKeysByPattern(`get:/subscriptions/${id}`);
        cacheService.invalidateKeysByPattern(`get:/admin/subscriptions`);
        return response;
    }
 
    async deleteSubscription(id: number) {
        const response = await apiFluxCore.delete(`/subscriptions/${id}`);
        cacheService.invalidateKeysByPattern('get:/admin/subscriptions'); // Invalidate cache
        return response.data;
    }

}

export const subscriptionService = new SubscriptionService();
