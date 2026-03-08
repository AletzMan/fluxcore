import { KpiSummary, MrrDataPoint, PlanDistribution, RecentSubscription, SystemStatus, TenantStorageUsage } from "../api/summary.types";

export interface DashboardSummary {
    kpis: KpiSummary;
    mrrChart: MrrDataPoint[];
    planDistribution: PlanDistribution[];
    systemStatus: SystemStatus;
    recentSubscriptions: RecentSubscription[];
    tenantStorageUsage: TenantStorageUsage[];   
}