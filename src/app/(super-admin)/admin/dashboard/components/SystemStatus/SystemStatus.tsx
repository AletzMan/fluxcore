import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";
import { Divider, Progress } from "lambda-ui-components";
import styles from "./SystemStatus.module.scss";

interface SystemStatusProps {
    uptime: number;
    latencyAverage: number;
    latencyMax: number;
    latencyMin: number;
}

export const SystemStatus = ({ uptime, latencyAverage, latencyMax, latencyMin }: SystemStatusProps) => {

    const latecyColor = (latency: number) => {
        if (latency < 100) {
            return "var(--success-base-color)";
        } else if (latency < 200) {
            return "var(--warning-base-color)";
        } else {
            return "var(--danger-base-color)";
        }
    }
    return (
        <DashboardCard title="Estado del sistema" description="Salud de la infraestructura">
            <div className={styles.container}>
                <Progress
                    value={uptime}
                    variant="circle"
                    size="large"
                    showValue
                    label="Disponibilidad"
                    color="success"
                />
            </div>
            <Divider spacing={1} />
            <div className={styles.latency}>
                <h2>Latencia</h2>
                <div className={styles.latency_container}>
                    <div className={styles.latency_item}>
                        <span>Máxima: </span>
                        <span style={{ color: latecyColor(latencyMax) }}>{latencyMax}ms</span>
                    </div>
                    <div className={styles.latency_item}>
                        <span>Promedio: </span>
                        <span style={{ color: latecyColor(latencyAverage) }}>{latencyAverage}ms</span>
                    </div>
                    <div className={styles.latency_item}>
                        <span>Mínima: </span>
                        <span style={{ color: latecyColor(latencyMin) }}>{latencyMin}ms</span>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
}