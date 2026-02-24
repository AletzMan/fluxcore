import { KpiSummary, MrrDataPoint, PlanDistribution, RecentSubscription, SystemStatus, TenantStorageUsage } from "../api/summary";

export interface DashboardSummary {
    kpis: KpiSummary;
    mrrChart: MrrDataPoint[];
    planDistribution: PlanDistribution[];
    systemStatus: SystemStatus;
    recentSubscriptions: RecentSubscription[];
    tenantStorageUsage: TenantStorageUsage[];   
}