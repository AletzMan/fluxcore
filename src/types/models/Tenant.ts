import { PlanStatusType, SubscriptionType } from "@/typesAPI/plan.types";


export interface Tenant {
    id: number;
    companyName: string;
    currentSubscriptionId: number;
    taxId: string;
    address: string;
    phone: string;
    email: string;
    logoUrl: string;
    status: PlanStatusType;
    subscription: SubscriptionType;
    isActive: boolean;
    createdAt: string;
    lastModifiedAt: string;
}