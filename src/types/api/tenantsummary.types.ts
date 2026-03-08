export interface TenantKpiSummary {
    totalRevenue: number;
    revenueChangePercent: number;
    totalSales: number;
    salesChangePercent: number;
    activeProducts: number;
    lowStockItems: number;
}
    
export interface SalesChartDataPoint {
    date: string;
    revenue: number;
    salesCount: number;
}
    
export interface TopSellingProduct {
    productId: number;
    productName: string;
    quantitySold: number;
    totalRevenue: number;
}
    
export interface RecentSaleActivity {
    saleId: number;
    invoiceNumber: string;
    date: string;
    total: number;
    status: string;
    customerName: string;
}
    
