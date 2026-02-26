import { apiFluxCoreServerGet } from "./axios-instance";
import { ApiResponse } from "@/typesAPI/common.types";
import { SystemLog } from "@/typesModels/SystemLog";

class SystemLogService {

    async getSystemLogs(): Promise<ApiResponse<SystemLog | null> | undefined> {
        const config = { cache: false }; // Siempre datos frescos en tiempo real
        const response = await apiFluxCoreServerGet<ApiResponse<SystemLog>>(
            `/admin/system/logs`,
            config as any
        );
        return response;
    }

}

export const systemLogService = new SystemLogService();
