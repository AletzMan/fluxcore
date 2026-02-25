import styles from "./RequestMetricsCard.module.scss";
import { DashboardCard } from "@/app/components/ui/DashboardCard/DashboardCard";
import { RequestMetrics } from "@/typesAPI/systemlog.types";

interface RequestMetricsCardProps {
    data: RequestMetrics;
}

function rateColor(rate: number): string {
    if (rate === 0) return "var(--success-base-color)";
    if (rate < 0.05) return "var(--warning-base-color)";
    return "var(--danger-base-color)";
}

function latencyColor(ms: number): string {
    if (ms < 100) return "var(--success-base-color)";
    if (ms < 500) return "var(--warning-base-color)";
    return "var(--danger-base-color)";
}

export function RequestMetricsCard({ data }: RequestMetricsCardProps) {
    return (
        <DashboardCard title="Métricas de Requests" description="Estadísticas de peticiones a la API">
            <div className={styles.kpis}>
                <div className={styles.kpi}>
                    <span className={styles.kpi_num}>{data.totalRequests.toLocaleString()}</span>
                    <span className={styles.kpi_label}>Total requests</span>
                </div>
                <div className={styles.kpi}>
                    <span className={styles.kpi_num} style={{ color: rateColor(data.clientErrorRate) }}>
                        {(data.clientErrorRate * 100).toFixed(2)}%
                    </span>
                    <span className={styles.kpi_label}>Errores 4xx</span>
                    <span className={styles.kpi_sub}>{data.totalClientErrors} peticiones</span>
                </div>
                <div className={styles.kpi}>
                    <span className={styles.kpi_num} style={{ color: rateColor(data.serverErrorRate) }}>
                        {(data.serverErrorRate * 100).toFixed(2)}%
                    </span>
                    <span className={styles.kpi_label}>Errores 5xx</span>
                    <span className={styles.kpi_sub}>{data.totalServerErrors} peticiones</span>
                </div>
                <div className={styles.kpi}>
                    <span className={styles.kpi_num} style={{ color: "var(--success-base-color)" }}>
                        {data.uptimePercent.toFixed(2)}%
                    </span>
                    <span className={styles.kpi_label}>Disponibilidad</span>
                </div>
            </div>

            <div className={styles.latency}>
                <h3>Latencia</h3>
                <div className={styles.latency_grid}>
                    <div className={styles.latency_item}>
                        <span>Promedio</span>
                        <span style={{ color: latencyColor(data.latencyAverageMs) }}>
                            {data.latencyAverageMs.toFixed(0)} ms
                        </span>
                    </div>
                    <div className={styles.latency_item}>
                        <span>Máxima</span>
                        <span style={{ color: latencyColor(data.latencyMaxMs) }}>
                            {data.latencyMaxMs.toFixed(0)} ms
                        </span>
                    </div>
                    <div className={styles.latency_item}>
                        <span>Mínima</span>
                        <span style={{ color: latencyColor(data.latencyMinMs) }}>
                            {data.latencyMinMs.toFixed(0)} ms
                        </span>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}
