import { Plan } from "./Plan";

export interface Subscription {
    id: number;
    tenantId: number;
    tenantName: string;
    planId: number;
    //plan: Plan;
    status: string;
    billingCycle: string;
    price: number;
    startDate: Date;
    endDate: Date;
    trialEndDate: Date | null;
    cancelledAt: Date | null;
    cancellationReason: string | null;
    autoRenew: boolean;
    nextBillingDate: Date | null;
    paymentMethodId: string | null;
    notes: string | null;
    daysRemaining: number;
    isExpired: boolean;
    isInTrial: boolean;
    isActive: boolean;
    createdAt: Date;
    lastModifiedAt: Date | null;
}