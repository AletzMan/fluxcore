import styles from "./EnvironmentCard.module.scss";
import { DashboardCard } from "@/app/components/ui/DashboardCard/DashboardCard";
import { EnvironmentInfo } from "@/typesAPI/systemlog.types";
import { Server, Monitor, Cpu, Globe, Tag, Box } from "lucide-react";

interface EnvironmentCardProps {
    data: EnvironmentInfo;
}

export function EnvironmentCard({ data }: EnvironmentCardProps) {
    const items = [
        { icon: <Tag size={16} strokeWidth={1.8} />, label: "Aplicación", value: data.applicationName },
        { icon: <Globe size={16} strokeWidth={1.8} />, label: "Entorno", value: data.environmentName },
        { icon: <Box size={16} strokeWidth={1.8} />, label: ".NET", value: data.dotnetVersion },
        { icon: <Monitor size={16} strokeWidth={1.8} />, label: "SO", value: data.osDescription },
        { icon: <Server size={16} strokeWidth={1.8} />, label: "Máquina", value: data.machineName },
        { icon: <Cpu size={16} strokeWidth={1.8} />, label: "Procesadores", value: data.processorCount },
    ];

    const envColor: Record<string, string> = {
        Production: "var(--success-base-color)",
        Staging: "var(--warning-base-color)",
        Development: "var(--info-base-color)",
    };

    return (
        <DashboardCard title="Entorno" description="Configuración de la infraestructura">
            <div className={styles.env_badge}
                style={{ "--env-color": envColor[data.environmentName] ?? "var(--foreground-tertiary-color)" } as React.CSSProperties}
            >
                {data.environmentName}
            </div>
            <div className={styles.grid}>
                {items.map((item) => (
                    <div key={item.label} className={styles.item}>
                        <span className={styles.item_icon}>{item.icon}</span>
                        <div className={styles.item_info}>
                            <span className={styles.item_label}>{item.label}</span>
                            <span className={styles.item_value}>{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardCard>
    );
}
