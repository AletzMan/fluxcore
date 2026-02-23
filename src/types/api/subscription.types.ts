import { BillingCycle } from "@/enums/common.enums";
import { BaseParams } from "./common.types";

 
export interface GetSubscriptionsParams extends BaseParams {
    tenantId?: number;
    planId?: number;
    status?: string;
    billingCycle?: string; 
    startDateFrom?: Date;
    startDateTo?: Date;
    endDateFrom?: Date;
    endDateTo?: Date;
    autoRenew?: boolean;
    isExpired?: boolean;
}
 
 export interface UpdateSubscription {
    billingCycle?: BillingCycle;
    autoRenew?: boolean;
    paymentMethodId?: string;
    notes?: string;
}
 
export interface CreateSubscription {
    tenantId: number;
    planId: number;
    billingCycle: BillingCycle;
    startDate: Date;
    isTrial: boolean;
    autoRenew: boolean;
    paymentMethodId?: string;
    notes?: string;
}