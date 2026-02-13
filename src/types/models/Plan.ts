import { SubscriptionType } from "@/enums/common.enums";

export interface Plan {
    id: number;
    name: string;
    description: string;
    type: SubscriptionType;
    monthlyPrice: number;
    quarterlyPrice: number;
    semiannualPrice: number;
    annualPrice: number;
    maxUsers: number;
    maxProducts: number;
    maxBranches: number;
    hasInventoryManagement: boolean;
    hasSalesReports: boolean;
    hasAdvancedReports: boolean;
    hasMultiCurrency: boolean;
    hasApiAccess: boolean;
    hasPrioritySupport: boolean;
    trialDays: number;
    features: string;
    isActive: boolean;
    createdAt: Date;
    lastModifiedAt: Date;
}
