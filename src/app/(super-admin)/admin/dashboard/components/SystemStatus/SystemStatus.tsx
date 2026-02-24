import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";
import { Divider, Link, Progress, Tooltip } from "lambda-ui-components";
import styles from "./SystemStatus.module.scss";
import { ExternalLink } from "lucide-react";
import { ApiErrorRate } from "@/typesAPI/summary";

interface SystemStatusProps {
    uptime: number;
    latencyAverage: number;
    latencyMax: number;
    latencyMin: number;
    errorRate: ApiErrorRate;
}

const latencyColor = (ms: number) => {
    if (ms < 100) return "var(--success-base-color)";
    if (ms < 500) return "var(--warning-base-color)";
    return "var(--danger-base-color)";
};

const rateColor = (rate: number) => {
    if (rate === 0) return "var(--success-base-color)";
    if (rate < 0.05) return "var(--warning-base-color)";
    return "var(--danger-base-color)";
};

export const SystemStatus = ({
    uptime,
    latencyAverage,
    latencyMax,
    latencyMin,
    errorRate,
}: SystemStatusProps) => {
    const clientPct = (errorRate.clientErrorRate * 100).toFixed(2);
    const serverPct = (errorRate.serverErrorRate * 100).toFixed(2);

    return (
        <DashboardCard
            title="Estado del sistema"
            description="Salud de la infraestructura"
            headerActions={
                <Tooltip content="Ver todas las analíticas" offset={10} color="info">
                    <Link
                        href="/admin/system-logs"
                        icon={<ExternalLink absoluteStrokeWidth />}
                        size="small"
                        color="info"
                        type="button"
                        variant="subtle"
                    />
                </Tooltip>
            }
        >
            {/* ── Uptime ── */}
            <div className={styles.container}>
                <div className={styles.uptime}>
                    <h3>Uptime</h3>
                    <Progress
                        value={uptime}
                        variant="circle"
                        size="large"
                        showValue
                        label="Uptime"
                        color="success"
                    />
                </div>

                {/* ── Latency ── */}
                <div className={styles.latency}>
                    <h3>Latencia</h3>
                    <div className={styles.latency_container}>
                        <div className={styles.latency_item}>
                            <span>Máxima:</span>
                            <span style={{ color: latencyColor(latencyMax) }}>{latencyMax.toFixed(0)} ms</span>
                        </div>
                        <div className={styles.latency_item}>
                            <span>Promedio:</span>
                            <span style={{ color: latencyColor(latencyAverage) }}>{latencyAverage.toFixed(0)} ms</span>
                        </div>
                        <div className={styles.latency_item}>
                            <span>Mínima:</span>
                            <span style={{ color: latencyColor(latencyMin) }}>{latencyMin.toFixed(0)} ms</span>
                        </div>
                    </div>
                </div>
            </div>

            <Divider spacing={1} />

            {/* ── Error Rate ── */}
            <div className={styles.errors}>
                <div className={styles.errors_header}>
                    <h3>Tasa de errores</h3>
                    <span className={styles.errors_total}>
                        {errorRate.totalRequests} requests
                    </span>
                </div>
                <div className={styles.errors_grid}>
                    <div className={styles.error_card}>
                        <span className={styles.error_label}>4xx — Cliente</span>
                        <span
                            className={styles.error_rate}
                            style={{ color: rateColor(errorRate.clientErrorRate) }}
                        >
                            {clientPct}%
                        </span>
                        <span className={styles.error_count}>
                            {errorRate.totalClientErrors} errores
                        </span>
                    </div>
                    <div className={styles.error_card}>
                        <span className={styles.error_label}>5xx — Servidor</span>
                        <span
                            className={styles.error_rate}
                            style={{ color: rateColor(errorRate.serverErrorRate) }}
                        >
                            {serverPct}%
                        </span>
                        <span className={styles.error_count}>
                            {errorRate.totalServerErrors} errores
                        </span>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};