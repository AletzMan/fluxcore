import { Divider } from "lambda-ui-components";
import styles from "./Adminpage.module.scss";
import { KipCard } from "@/app/components/ui/KipCard/KipCard";
import { AreaChart } from "@/app/components/ui/AreaChart/AreaChart";
import { DonutChart } from "@/app/components/ui/DonutChart/DonutChart";
import { RegisteredTenants, TableData } from "./components/RegisteredTenants";
import { UsageTenants } from "./components/UsageTenants";
import { SystemStatus } from "./components/SystemStatus/SystemStatus";
import { ChartGroup } from "@/typesComponents/chart";
import { ContainerSection } from "@/pp/components/layout/ContainerSection/ContainerSection";
import { summaryService } from "@/app/services/api/summary.service";
import { DashboardSummary } from "@/typesModels/summary";
import { MrrDataPoint, PlanDistribution } from "@/typesAPI/summary";

// ─── Helpers de transformación ───────────────────────────────────────────────

function buildAreaChart(mrrChart: MrrDataPoint[]): ChartGroup {
    // Agrupa los puntos por año para que el AreaChart los acepte como grupos
    const years = [...new Set(mrrChart.map((p) => String(p.year)))];
    const data = mrrChart.map((p) => ({
        name: p.month,
        label: p.label,
        ...years.reduce<Record<string, number>>((acc, year) => {
            if (String(p.year) === year) acc[year] = p.revenue;
            return acc;
        }, {}),
    }));
    return { data, groups: years };
}

function buildDonutData(planDistribution: PlanDistribution[]) {
    return planDistribution.map((p) => ({
        name: p.planName,
        value: p.tenantCount,
    }));
}

// ─── Datos de fallback (mientras el backend no esté disponible) ───────────────

const FALLBACK_SUMMARY: DashboardSummary = {
    kpis: {
        mrr: 4365.56,
        mrrChangePercent: 0.35,
        totalTenants: 37,
        tenantChangePercent: 0.12,
        activeSubscriptions: 43,
        subscriptionChangePercent: 0.05,
        churnRate: 0.05,
        churnChangePercent: 0.26,
        apiCallTenants: 1365,
    },
    mrrChart: [
        { month: "Ene", label: "Enero", year: 2025, revenue: 12450 },
        { month: "Feb", label: "Febrero", year: 2025, revenue: 13800 },
        { month: "Mar", label: "Marzo", year: 2025, revenue: 11200 },
        { month: "Abr", label: "Abril", year: 2025, revenue: 15600 },
        { month: "May", label: "Mayo", year: 2025, revenue: 18900 },
        { month: "Jun", label: "Junio", year: 2025, revenue: 17400 },
        { month: "Jul", label: "Julio", year: 2025, revenue: 22300 },
        { month: "Ago", label: "Agosto", year: 2025, revenue: 20100 },
        { month: "Sep", label: "Septiembre", year: 2025, revenue: 18500 },
        { month: "Oct", label: "Octubre", year: 2025, revenue: 21200 },
        { month: "Nov", label: "Noviembre", year: 2025, revenue: 28400 },
        { month: "Dic", label: "Diciembre", year: 2025, revenue: 35900 },
    ],
    planDistribution: [
        { planName: "Free", tenantCount: 40 },
        { planName: "Basic", tenantCount: 30 },
        { planName: "Pro", tenantCount: 5 },
        { planName: "Enterprise", tenantCount: 15 },
    ],
    systemStatus: {
        uptime: 99.9,
        latencyAverageMs: 120,
        latencyMaxMs: 350,
        latencyMinMs: 18,
        errorRate: {
            clientErrorRate: 0,
            serverErrorRate: 0,
            totalRequests: 0,
            totalClientErrors: 0,
            totalServerErrors: 0,
        },
    },
    recentSubscriptions: [],
    tenantStorageUsage: [],

};

const getSummary = async () => {
    const result = await summaryService.getDashboardSummary();
    const summary: DashboardSummary =
        result?.success && result.data ? result.data : FALLBACK_SUMMARY;
    return summary;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AdminPage() {

    const summary = await getSummary();
    console.log("summary", summary);
    const { kpis, mrrChart, planDistribution, systemStatus, recentSubscriptions, tenantStorageUsage } = summary;

    const areaData = buildAreaChart(mrrChart);
    const donutData = buildDonutData(planDistribution);

    return (
        <ContainerSection title="Panel de control global" description="Vista general del rendimiento del ecosistema FluxCore">
            <div className={styles.kips}>
                <KipCard type="revenue" value={kpis.mrr} percentage={kpis.mrrChangePercent} trend={kpis.mrrChangePercent === 0 ? "neutral" : kpis.mrrChangePercent > 0 ? "up" : "down"} />
                <KipCard type="tenants" value={kpis.totalTenants} percentage={kpis.tenantChangePercent} trend={kpis.tenantChangePercent === 0 ? "neutral" : kpis.tenantChangePercent > 0 ? "up" : "down"} />
                <KipCard type="subscriptions" value={kpis.activeSubscriptions} percentage={kpis.subscriptionChangePercent} trend={kpis.subscriptionChangePercent === 0 ? "neutral" : kpis.subscriptionChangePercent > 0 ? "up" : "down"} />
                <KipCard type="churnRate" value={kpis.churnRate} percentage={kpis.churnChangePercent} trend={kpis.churnChangePercent === 0 ? "neutral" : kpis.churnChangePercent > 0 ? "up" : "down"} />
                <KipCard type="apiCalls" value={kpis.apiCallTenants} />
            </div>
            <Divider spacing={10} />
            <div className={`${styles.wrapper} `}>
                <div className={styles.charts}>
                    <div className={styles.charts_area}>
                        <AreaChart
                            data={areaData}
                            type="currency"
                            title="Tendencia de crecimiento MRR"
                            description="Rendimiento en los últimos 12 meses"
                            curveType="linear"
                        />
                    </div>
                    <div className={styles.charts_donut}>
                        <DonutChart
                            cx="50%"
                            cy="47%"
                            data={donutData}
                            dataKey="value"
                            fill="var(--surface-d)"
                            innerRadius={45}
                            outerRadius={70}
                            title="Distribución de Suscripciones"
                            description="Desglose de tenants activos por nivel de servicio"
                        />
                    </div>
                </div>
                <div className={styles.tables}>
                    <RegisteredTenants data={recentSubscriptions} />
                    <UsageTenants data={tenantStorageUsage} />
                    <SystemStatus
                        uptime={systemStatus.uptime}
                        latencyAverage={systemStatus.latencyAverageMs}
                        latencyMax={systemStatus.latencyMaxMs}
                        latencyMin={systemStatus.latencyMinMs}
                        errorRate={systemStatus.errorRate}
                    />
                </div>
            </div>
        </ContainerSection>
    );
}

// ─── Datos estáticos (pendientes de endpoint propio) ─────────────────────────

const tableData: TableData[] = [

];

const usageData: TableData[] = [

];
