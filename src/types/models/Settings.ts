 
export interface SystemSettingsResponse {
    maintenance: MaintenanceStatus;
}

export interface MaintenanceStatus {
    isEnabled: boolean;
    message: string;
    enabledAt: Date;
    enabledBy: string;
}

