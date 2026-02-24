 
export interface KpiSummary {
    mrr: number;
    mrrChangePercent: number;
    totalTenants: number;
    tenantChangePercent: number;
    activeSubscriptions: number;
    subscriptionChangePercent: number;
    churnRate: number;
    churnChangePercent: number;
    apiCallTenants: number;
}

export interface MrrDataPoint {
    month: string;
    label: string;
    year: number;
    revenue: number;
}

export interface PlanDistribution {
    planName: string;
    tenantCount: number;
}

export interface ApiErrorRate {
    clientErrorRate: number;
    serverErrorRate: number;
    totalRequests: number;
    totalClientErrors: number;
    totalServerErrors: number;
}

export interface SystemStatus {
    uptime: number;
    latencyAverageMs: number;
    latencyMaxMs: number;
    latencyMinMs: number;
    errorRate: ApiErrorRate;
}

export interface RecentSubscription {
    id: number;
    tenantName: string;
    planName: string;
    status: string;
    billingCycle: string;
    price: number;
    startDate: string;
    endDate: string;
}

export interface TenantStorageUsage {
    tenantId: number;
    tenantName: string;
    planName: string;
    usersUsed: number;
    usersMax: number;
    usersPercent: number;
    productsUsed: number;
    productsMax: number;
    productsPercent: number;
    branchesMax: number;
}