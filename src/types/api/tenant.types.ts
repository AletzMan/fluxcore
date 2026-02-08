import { PlanStatusType, SubscriptionType } from "./plan.types";

export interface RegisterTenantRequest {
    name: string;
    username: string;
    companyName: string;
    subscription: SubscriptionType;
    email: string;
    password: string;
}

export interface GetTenantsParams {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: string;
    search?: string;
    status?: PlanStatusType;
    subscription?: SubscriptionType;
    createdFrom?: Date;
    createdTo?: Date;
}