import { PlanStatusType, SubscriptionType } from "@/typesAPI/plan.types";


export interface Tenant {
    id: string;
    name: string;
    subscription: SubscriptionType;
    isActive: boolean;
    status: PlanStatusType;
    validUntil: string;
    createdAt: string;
}