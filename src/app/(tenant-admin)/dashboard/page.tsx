import { Divider } from "lambda-ui-components";
import styles from "./Tenantpage.module.scss";
import { KipCard } from "@/app/components/ui/KipCard/KipCard";
import { AreaChart } from "@/app/components/ui/AreaChart/AreaChart";
import { RecentSales } from "./components/RecentSales";
import { TopProducts } from "./components/TopProducts";
import { ChartGroup } from "@/typesComponents/chart";
import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { tenantDashboardService } from "@/app/services/api/tenant-dashboard.service";
import { SalesChartDataPoint } from "@/typesAPI/tenantsummary.types";
import { TableError } from "@/app/components/ui/TableError/TableError";

function buildAreaChart(salesChart: SalesChartDataPoint[]): ChartGroup {
    const data = salesChart.map((p) => ({
        name: p.date,
        label: p.date,
        Ventas: p.revenue
    }));
    return { data, groups: ['Ventas'] };
}

const getSummary = async () => {
    // Return null in development if backend is not ready to avoid app crash
    try {
        const result = await tenantDashboardService.getTenantDashboardSummary();
        return result;
    } catch {
        return null; // Fallback
    }
}

export default async function DashboardPage() {
    const summary = await getSummary();

    if (!summary?.success || !summary?.data) {
        // Fallback for UI visualization while endpoint is developed
        const dummyData = {
            kpis: {
                totalRevenue: 24500,
                revenueChangePercent: 12.5,
                totalSales: 350,
                salesChangePercent: -2.3,
                activeProducts: 120,
                lowStockItems: 5
            },
            salesChart: [
                { date: "Ene", revenue: 5000, salesCount: 50 },
                { date: "Feb", revenue: 6000, salesCount: 60 },
                { date: "Mar", revenue: 4500, salesCount: 45 },
            ],
            topProducts: [
                { productId: 1, productName: "Producto Genérico", quantitySold: 45, totalRevenue: 900 }
            ],
            recentSales: []
        };
        summary!.data = dummyData;
    }

    const { kpis, salesChart, topProducts, recentSales } = summary!.data;
    const areaData = buildAreaChart(salesChart);

    return (
        <ContainerSection title="Dashboard" description="Bienvenido al panel de control de tu negocio. Aquí podrás ver un resumen de tus ventas y operaciones.">
            <div className={styles.kips}>
                <KipCard type="revenue" value={kpis.totalRevenue} percentage={kpis.revenueChangePercent} trend={kpis.revenueChangePercent === 0 ? "neutral" : kpis.revenueChangePercent > 0 ? "up" : "down"} />
                <KipCard type="totalSales" value={kpis.totalSales} percentage={kpis.salesChangePercent} trend={kpis.salesChangePercent === 0 ? "neutral" : kpis.salesChangePercent > 0 ? "up" : "down"} />
                <KipCard type="activeProducts" value={kpis.activeProducts} />
                <KipCard type="stockAlerts" value={kpis.lowStockItems} />
            </div>

            <Divider spacing={10} />

            <div className={styles.wrapper}>
                <div className={styles.charts}>
                    <div className={styles.charts_area}>
                        <AreaChart
                            data={areaData}
                            type="currency"
                            title="Ingresos"
                            description="Tus ingresos de ventas en los últimos días"
                            curveType="monotone"
                        />
                    </div>
                </div>

                <div className={styles.tables}>
                    <RecentSales data={recentSales} />
                    <TopProducts data={topProducts} />
                </div>
            </div>
        </ContainerSection>
    );
}
