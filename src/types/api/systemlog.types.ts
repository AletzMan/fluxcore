/*

public class ProcessInfoDto
{
    /// <summary>Fecha/hora UTC en que arrancó el proceso.</summary>
    public DateTime StartedAt { get; set; }
    /// <summary>Tiempo total que lleva corriendo el servidor.</summary>
    public string Uptime { get; set; } = string.Empty;
    /// <summary>Tiempo de uptime expresado en segundos totales.</summary>
    public long UptimeSeconds { get; set; }
    /// <summary>Memoria RAM usada por el proceso (MB).</summary>
    public double MemoryUsedMb { get; set; }
    /// <summary>Número de threads activos del proceso.</summary>
    public int ThreadCount { get; set; }
    /// <summary>Tiempo de CPU consumido por el proceso (segundos).</summary>
    public double CpuTimeSeconds { get; set; }
}

public class EnvironmentInfoDto
{
    public string DotnetVersion { get; set; } = string.Empty;
    public string OsDescription { get; set; } = string.Empty;
    public string MachineName { get; set; } = string.Empty;
    public int ProcessorCount { get; set; }
    public string EnvironmentName { get; set; } = string.Empty;
    public string ApplicationName { get; set; } = string.Empty;
}

public class RequestMetricsDto
{
    public long TotalRequests { get; set; }
    public long TotalClientErrors { get; set; }
    public long TotalServerErrors { get; set; }
    public double ClientErrorRate { get; set; }
    public double ServerErrorRate { get; set; }
    public double LatencyAverageMs { get; set; }
    public double LatencyMaxMs { get; set; }
    public double LatencyMinMs { get; set; }
    /// <summary>Disponibilidad estimada: (1 - serverErrorRate) * 100.</summary>
    public double UptimePercent { get; set; }
}

public class HealthStatusDto
{
    public string Status { get; set; } = string.Empty;
    public List<HealthCheckEntryDto> Checks { get; set; } = new();
}

public class HealthCheckEntryDto
{
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? Description { get; set; }
    public double DurationMs { get; set; }
}

public class RequestLogEntryDto
{
    public DateTime Timestamp { get; set; }
    public string Method { get; set; } = string.Empty;
    public string Path { get; set; } = string.Empty;
    public int StatusCode { get; set; }
    public double DurationMs { get; set; }
}

*/

export interface ProcessInfo {
    startedAt: Date;
    uptime: string;
    uptimeSeconds: number;
    memoryUsedMb: number;
    threadCount: number;
    cpuTimeSeconds: number;
}

export interface EnvironmentInfo {
    dotnetVersion: string;
    osDescription: string;
    machineName: string;
    processorCount: number;
    environmentName: string;
    applicationName: string;
}

export interface RequestMetrics {
    totalRequests: number;
    totalClientErrors: number;
    totalServerErrors: number;
    clientErrorRate: number;
    serverErrorRate: number;
    latencyAverageMs: number;
    latencyMaxMs: number;
    latencyMinMs: number;
    uptimePercent: number;
}

export interface HealthStatus {
    status: string;
    checks: HealthCheckEntry[];
}

export interface HealthCheckEntry {
    name: string;
    status: string;
    description: string;
    durationMs: number;
}

export interface RequestLogEntry {
    timestamp: Date;
    method: string;
    path: string;
    statusCode: number;
    durationMs: number;
}
    