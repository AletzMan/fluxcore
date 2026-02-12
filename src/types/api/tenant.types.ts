import { BaseParams } from "./common.types";
import { PlanStatusType, SubscriptionType } from "./plan.types";

export enum BillingCycle {
    MONTHLY = 1,
    QUARTERLY = 2,
    SEMIANNUAL = 3,
    ANNUAL = 4
}

export interface RegisterTenantRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    companyName: string;
    taxId?: string;
    address?: string;
    phone?: string;
    companyEmail?: string;
    planId: number;
    billingCycle: BillingCycle;
    autoRenew: boolean;
    startTrial: boolean;
    paymentMethodId?: string;
}

export interface GetTenantsParams extends BaseParams {
    status?: PlanStatusType;
    subscription?: SubscriptionType;
    createdFrom?: Date;
    createdTo?: Date;
}