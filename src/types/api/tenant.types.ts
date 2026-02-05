import { SubscriptionType } from "./plan.types";

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
    sort?: string;
    order?: string;
    search?: string;
    isActive?: boolean;
    subscription?: string;
}