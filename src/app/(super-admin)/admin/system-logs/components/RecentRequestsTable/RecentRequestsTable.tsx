import styles from "./RecentRequestsTable.module.scss";
import { DashboardCard } from "@/app/components/ui/DashboardCard/DashboardCard";
import { RequestLogEntry } from "@/typesAPI/systemlog.types";

interface RecentRequestsTableProps {
    data: RequestLogEntry[];
}

function statusClass(code: number): string {
    if (code < 300) return styles.status_success;
    if (code < 400) return styles.status_redirect;
    if (code < 500) return styles.status_client;
    return styles.status_server;
}

const methodColors: Record<string, string> = {
    GET: "#3b82f6",
    POST: "#10b981",
    PUT: "#f59e0b",
    PATCH: "#8b5cf6",
    DELETE: "#f43f5e",
};

export function RecentRequestsTable({ data }: RecentRequestsTableProps) {
    return (
        <DashboardCard title="Requests recientes" description="Últimas peticiones registradas por la API">
            <div className={styles.table_wrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Método</th>
                            <th>Ruta</th>
                            <th>Status</th>
                            <th>Duración</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((req, i) => (
                            <tr key={i}>
                                <td className={styles.cell_time}>
                                    {new Date(req.timestamp).toLocaleTimeString("es-MX", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </td>
                                <td>
                                    <span
                                        className={styles.method_badge}
                                        style={{ "--method-color": methodColors[req.method] ?? "#6b7280" } as React.CSSProperties}
                                    >
                                        {req.method}
                                    </span>
                                </td>
                                <td className={styles.cell_path} title={req.path}>
                                    {req.path}
                                </td>
                                <td>
                                    <span className={`${styles.status_badge} ${statusClass(req.statusCode)}`}>
                                        {req.statusCode}
                                    </span>
                                </td>
                                <td className={styles.cell_duration}>
                                    {req.durationMs.toFixed(1)} ms
                                </td>
                            </tr>
                        ))}
                        {data.length === 0 && (
                            <tr>
                                <td colSpan={5} className={styles.empty}>Sin requests registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardCard>
    );
}
