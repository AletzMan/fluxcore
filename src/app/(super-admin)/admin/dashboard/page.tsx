import { Divider } from "lambda-ui-components";
import styles from "./Adminpage.module.scss";
import { KipCard } from "@/app/components/ui/KipCard/KipCard";
import { AreaChart } from "@/app/components/ui/AreaChart/AreaChart";
import { DonutChart } from "@/app/components/ui/DonutChart/DonutChart";
import { RegisteredTenants } from "./components/RegisteredTenants";
import { UsageTenants } from "./components/UsageTenants";
import { SystemStatus } from "./components/SystemStatus/SystemStatus";
import { ChartGroup } from "@/typesComponents/chart";
import { ContainerSection } from "@/pp/components/layout/ContainerSection/ContainerSection";
import { summaryService } from "@/app/services/api/summary.service";
import { MrrDataPoint, PlanDistribution } from "@/typesAPI/summary";
import { TableError } from "@/pp/components/ui/TableError/TableError";


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

const getSummary = async () => {
    const result = await summaryService.getDashboardSummary();
    return result;
}


export default async function AdminPage() {

    const summary = await getSummary();

    if (!summary?.success || !summary?.data) {
        return (
            <TableError
                isError={true}
                isNotFound={false}
                isEmptyResponse={false}
                isSearch={false} />
        );
    }

    const { kpis, mrrChart, planDistribution, systemStatus, recentSubscriptions, tenantStorageUsage } = summary.data;

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
