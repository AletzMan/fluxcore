import { BaseParams } from "./common.types";
import { BillingCycle, PlanStatusType, SubscriptionType } from "@/enums/common.enums";

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