"use client"
import { DataTable, DataTableColumn } from "@/pp/components/ui/DataTable/DataTable";
import { Pagination } from "@/typesAPI/common.types";
import { PlanStatusType } from "@/enums/common.enums";
import { Tenant } from "@/typesModels/Tenant";
import { Tag } from "lambda-ui-components";
import styles from "./TenantsView.module.scss";
import { formatDateTimeShort } from "@/utils/common-utils";

interface TenantsViewProps {
    tenants: Tenant[];
    pagination: Pagination;
    success?: boolean;
}

export const TenantsView = ({ tenants, pagination, success }: TenantsViewProps) => {

    return (
        <DataTable<Tenant>
            data={tenants || []}
            columns={columns}
            pagination={pagination}
            success={success}
            actions={[
                "view",
                "delete"
            ]}
            filters={[
                { id: '1', key: 'subscription', value: '1', label: 'Free', type: 'multiple-choice', nameGroup: 'Suscripción' },
                { id: '2', key: 'subscription', value: '2', label: 'Basic', type: 'multiple-choice', nameGroup: 'Suscripción' },
                { id: '3', key: 'subscription', value: '3', label: 'Premium', type: 'multiple-choice', nameGroup: 'Suscripción' },
                { id: '4', key: 'subscription', value: '4', label: 'Enterprise', type: 'multiple-choice', nameGroup: 'Suscripción' },
                { id: '5', key: 'subscription', value: '5', label: 'Intertal', type: 'multiple-choice', nameGroup: 'Suscripción' },
                { id: '6', key: 'status', value: '1', label: 'Activo', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '7', key: 'status', value: '2', label: 'Trial', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '8', key: 'status', value: '3', label: 'Expirado', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '9', key: 'status', value: '4', label: 'Suspensión', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '10', key: 'status', value: '5', label: 'Cancelado', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '11', key: 'createdFrom', value: '2022-01-01', label: 'Desde', type: 'date', nameGroup: 'Fecha de creación' },
                { id: '12', key: 'createdTo', value: '2022-01-01', label: 'Hasta', type: 'date', nameGroup: 'Fecha de creación' },
            ]}
        />
    );
}


const columns: DataTableColumn<Tenant>[] = [
    {
        sortKey: 'id',
        nameColumn: 'Id',
        type: 'number',
        width: '50px',
        align: 'center',
        isSortable: true,
        render: (tenant) => tenant.id,
    },
    {
        sortKey: 'companyName',
        nameColumn: 'Empresa',
        type: 'string',
        width: '180px',
        align: 'center',
        isSortable: true,
        render: (tenant) => tenant.companyName,
    },
    {
        sortKey: 'email',
        nameColumn: 'Email',
        type: 'string',
        width: '130px',
        align: 'center',
        isSortable: true,
        render: (tenant) => tenant.email,
    },
    {
        sortKey: 'status',
        nameColumn: 'Estado',
        type: 'string',
        width: '80px',
        align: 'center',
        isSortable: true,
        render: (tenant) => (
            <Tag
                text={statusComponent[tenant.status]}
                color={getStatusColor(tenant.status)}
                size='tiny'
                radius='small'
                variant='subtle'
            />
        ),
    },
    {
        sortKey: 'createdAt',
        nameColumn: 'Creado',
        type: 'date',
        width: '80px',
        align: 'center',
        isSortable: true,
        render: (tenant) => formatDateTimeShort(tenant.createdAt),
    },
    {
        sortKey: 'lastModifiedAt',
        nameColumn: 'Actualizado',
        type: 'date',
        width: '80px',
        align: 'center',
        isSortable: true,
        render: (tenant) => formatDateTimeShort(tenant.lastModifiedAt),
    }
]

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


