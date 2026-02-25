/*
public class SystemLogsResponse
{
    public ProcessInfoDto Process { get; set; } = new();
    public EnvironmentInfoDto Environment { get; set; } = new();
    public RequestMetricsDto RequestMetrics { get; set; } = new();
    public HealthStatusDto Health { get; set; } = new();
    public List<RequestLogEntryDto> RecentRequests { get; set; } = new();
}

*/

import { ProcessInfo, EnvironmentInfo, RequestMetrics, HealthStatus, RequestLogEntry } from "@/typesAPI/systemlog.types";

export interface SystemLog {
    process: ProcessInfo;
    environment: EnvironmentInfo;
    requestMetrics: RequestMetrics;
    health: HealthStatus;
    recentRequests: RequestLogEntry[];
}
