import { PlanStatusType } from "@/enums/common.enums";

export function getStatusColor(status: PlanStatusType): 'success' | 'warning' | 'danger' | 'primary' | 'neutral' | 'secondary' | 'info' {
    switch (status) {
        case PlanStatusType.ACTIVE: return 'success';
        case PlanStatusType.TRIAL: return 'primary';
        case PlanStatusType.SUSPENDED: return 'warning';
        case PlanStatusType.EXPIRED:
        case PlanStatusType.CANCELLED: return 'danger';
        default: return 'neutral';
    }
}

export const statusComponent = {
    ACTIVE: 'Activo',
    TRIAL: 'Trial',
    SUSPENDED: 'Suspendido',
    EXPIRED: 'Expirado',
    CANCELLED: 'Cancelado',
    DEFAULT: 'Inactivo',
}


