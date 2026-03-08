import { TenantKpiSummary, SalesChartDataPoint, TopSellingProduct, RecentSaleActivity } from "@/typesAPI/tenantsummary.types";

export interface TenantDashboardSummary {
    kpis: TenantKpiSummary;
    salesChart: SalesChartDataPoint[];
    topProducts: TopSellingProduct[];
    recentSales: RecentSaleActivity[];
}
    