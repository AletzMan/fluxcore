import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';
import styles from './SystemLogspage.module.scss';
import { systemLogService } from '@/app/services/api/systemlog.service';
import { ProcessInfoCard } from './components/ProcessInfoCard/ProcessInfoCard';
import { EnvironmentCard } from './components/EnvironmentCard/EnvironmentCard';
import { RequestMetricsCard } from './components/RequestMetricsCard/RequestMetricsCard';
import { HealthStatusCard } from './components/HealthStatusCard/HealthStatusCard';
import { RecentRequestsTable } from './components/RecentRequestsTable/RecentRequestsTable';
import { SystemLog } from '@/typesModels/SystemLog';
import { TableError } from '@/pp/components/ui/TableError/TableError';

export default async function SystemLogsPage() {
    const result = await systemLogService.getSystemLogs();

    const data: SystemLog = result?.data || {} as SystemLog;
    return (
        <ContainerSection
            title="Trazabilidad Técnica"
            description="Auditoría de eventos, registro de excepciones y actividad crítica de la API en tiempo real."
        >
            {!result?.success || !result?.data ? <TableError
                isError={true}
                isNotFound={false}
                isEmptyResponse={false}
                isSearch={false} /> : <div className={styles.system_logs}>
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
            </div>}
        </ContainerSection>
    );
}
