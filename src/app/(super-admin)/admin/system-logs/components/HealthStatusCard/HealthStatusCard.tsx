import styles from "./HealthStatusCard.module.scss";
import { DashboardCard } from "@/app/components/ui/DashboardCard/DashboardCard";
import { HealthStatus } from "@/typesAPI/systemlog.types";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface HealthStatusCardProps {
    data: HealthStatus;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
    Healthy: { icon: <CheckCircle2 size={16} strokeWidth={1.8} />, color: "var(--success-base-color)" },
    Degraded: { icon: <AlertCircle size={16} strokeWidth={1.8} />, color: "var(--warning-base-color)" },
    Unhealthy: { icon: <XCircle size={16} strokeWidth={1.8} />, color: "var(--danger-base-color)" },
};

function getStatusConfig(status: string) {
    return statusConfig[status] ?? statusConfig["Degraded"];
}

export function HealthStatusCard({ data }: HealthStatusCardProps) {
    const overall = getStatusConfig(data.status);

    return (
        <DashboardCard title="Health Checks" description="Estado de los servicios de la infraestructura">
            {/* Badge global */}
            <div
                className={styles.overall}
                style={{ "--health-color": overall.color } as React.CSSProperties}
            >
                {overall.icon}
                <span>{data.status}</span>
            </div>

            {/* Lista de checks */}
            <div className={styles.checks}>
                {data.checks.map((check) => {
                    const cfg = getStatusConfig(check.status);
                    return (
                        <div key={check.name} className={styles.check}>
                            <span
                                className={styles.check_icon}
                                style={{ color: cfg.color }}
                            >
                                {cfg.icon}
                            </span>
                            <div className={styles.check_info}>
                                <span className={styles.check_name}>{check.name}</span>
                                {check.description && (
                                    <span className={styles.check_desc}>{check.description}</span>
                                )}
                            </div>
                            <span className={styles.check_duration}>
                                {check.durationMs.toFixed(1)} ms
                            </span>
                        </div>
                    );
                })}
            </div>
        </DashboardCard>
    );
}
