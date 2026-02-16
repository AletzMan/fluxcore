import { BaseParams } from "./common.types";

export interface GetPlansParams extends BaseParams {
    isActive?: boolean;
    minPrice?: number;
    maxPrice?: number;
}


export interface PlanFeature {
    name: string;
    description: string;
    isEnabled: boolean;
    displayOrder: number;
}

export interface UpdatePlan {
    name?: string;
    description?: string;
    monthlyPrice?: number;
    quarterlyPrice?: number;
    semiannualPrice?: number;
    annualPrice?: number;
    maxUsers?: number;
    maxProducts?: number;
    maxBranches?: number;
    hasInventoryManagement?: boolean;
    hasSalesReports?: boolean;
    hasAdvancedReports?: boolean;
    hasMultiCurrency?: boolean;
    hasApiAccess?: boolean;
    hasPrioritySupport?: boolean;
    trialDays?: number;
    features?: PlanFeature[];
}

export interface CreatePlan {
    name: string;
    description: string;
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
    features?: PlanFeature[];
}