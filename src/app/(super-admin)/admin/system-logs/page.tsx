import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';
import styles from './SystemLogspage.module.scss';
import { systemLogService } from '@/app/services/api/systemlog.service';
import { ProcessInfoCard } from './components/ProcessInfoCard/ProcessInfoCard';
import { EnvironmentCard } from './components/EnvironmentCard/EnvironmentCard';
import { RequestMetricsCard } from './components/RequestMetricsCard/RequestMetricsCard';
import { HealthStatusCard } from './components/HealthStatusCard/HealthStatusCard';
import { RecentRequestsTable } from './components/RecentRequestsTable/RecentRequestsTable';
import { SystemLog } from '@/typesModels/SystemLog';

// ─── Fallback ─────────────────────────────────────────────────────────────────

const FALLBACK: SystemLog = {
    process: {
        startedAt: new Date(),
        uptime: "0d 0h 0m",
        uptimeSeconds: 0,
        memoryUsedMb: 0,
        threadCount: 0,
        cpuTimeSeconds: 0,
    },
    environment: {
        applicationName: "—",
        environmentName: "—",
        dotnetVersion: "—",
        osDescription: "—",
        machineName: "—",
        processorCount: 0,
    },
    requestMetrics: {
        totalRequests: 0,
        totalClientErrors: 0,
        totalServerErrors: 0,
        clientErrorRate: 0,
        serverErrorRate: 0,
        latencyAverageMs: 0,
        latencyMaxMs: 0,
        latencyMinMs: 0,
        uptimePercent: 0,
    },
    health: {
        status: "Unhealthy",
        checks: [],
    },
    recentRequests: [],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SystemLogsPage() {
    const result = await systemLogService.getSystemLogs();
    const data: SystemLog =
        result?.success && result.data ? result.data : FALLBACK;

    return (
        <ContainerSection
            title="Trazabilidad Técnica"
            description="Auditoría de eventos, registro de excepciones y actividad crítica de la API en tiempo real."
        >
            <div className={styles.system_logs}>
                {/* Fila 1 — Proceso · Entorno · Métricas · Health */}
                <div className={styles.top_grid}>
                    <ProcessInfoCard data={data.process} />
                    <EnvironmentCard data={data.environment} />
                    <RequestMetricsCard data={data.requestMetrics} />
                    <HealthStatusCard data={data.health} />
                </div>

                {/* Fila 2 — Tabla de requests recientes */}
                <div className={styles.bottom}>
                    <RecentRequestsTable data={data.recentRequests} />
                </div>
            </div>
        </ContainerSection>
    );
}
