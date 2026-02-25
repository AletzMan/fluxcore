import styles from "./ProcessInfoCard.module.scss";
import { DashboardCard } from "@/app/components/ui/DashboardCard/DashboardCard";
import { ProcessInfo } from "@/typesAPI/systemlog.types";
import { Cpu, Clock, MemoryStick, Layers } from "lucide-react";

interface ProcessInfoCardProps {
    data: ProcessInfo;
}

function formatUptime(seconds: number): string {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    parts.push(`${m}m`);
    return parts.join(" ");
}

export function ProcessInfoCard({ data }: ProcessInfoCardProps) {
    const items = [
        {
            icon: <Clock size={16} strokeWidth={1.8} />,
            label: "Uptime",
            value: formatUptime(data.uptimeSeconds),
        },
        {
            icon: <MemoryStick size={16} strokeWidth={1.8} />,
            label: "Memoria RAM",
            value: `${data.memoryUsedMb.toFixed(1)} MB`,
        },
        {
            icon: <Layers size={16} strokeWidth={1.8} />,
            label: "Threads activos",
            value: data.threadCount,
        },
        {
            icon: <Cpu size={16} strokeWidth={1.8} />,
            label: "Tiempo CPU",
            value: `${data.cpuTimeSeconds.toFixed(2)} s`,
        },
    ];

    return (
        <DashboardCard title="Proceso" description="Información del proceso del servidor">
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
            <div className={styles.started}>
                Iniciado el{" "}
                <strong>
                    {new Date(data.startedAt).toLocaleString("es-MX", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                </strong>
            </div>
        </DashboardCard>
    );
}
