


export interface PlanFeature {
    id: number;
    name: string;
    description: string;
    isEnabled: boolean;
    displayOrder: number;
}

export interface Plan {
    id: number;
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
    features: PlanFeature[];
    isActive: boolean;
    createdAt: Date;
    lastModifiedAt: Date;
}

