"use client"
import { DataTable, DataTableColumn } from "@/pp/components/ui/DataTable/DataTable";
import { Pagination } from "@/typesAPI/common.types";
import { Tenant } from "@/typesModels/Tenant";
import { Tag, useNotification } from "lambda-ui-components";
import styles from "./TenantsView.module.scss";
import { formatDateTimeShort } from "@/utils/common-utils";
import { tenantService } from "@/pp/services/api/tenant.service";
import { ErrorMessages } from "@/lib/errors/message-errors";
import { statusComponent, getStatusColor } from "@/pp/constants/common";

interface TenantsViewProps {
    tenants: Tenant[];
    pagination: Pagination;
    success?: boolean;
}

export const TenantsView = ({ tenants, pagination, success }: TenantsViewProps) => {
    const { showNotification } = useNotification();

    const deleteTenant = async (id: number) => {
        try {
            const response = await tenantService.updateTenant(id, { isActive: false });

            if (response.success) {
                setTimeout(() => {
                    document.location.reload();
                }, 5000);
                showNotification({
                    message: "Tenant eliminado correctamente",
                    notificationType: "success",
                });
            } else {
                showNotification({
                    message: ErrorMessages[response.code] || "Error al eliminar el tenant",
                    notificationType: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: "Error al eliminar el tenant",
                notificationType: "danger",
            });
        }
    }

    return (
        <DataTable<Tenant>
            data={tenants || []}
            columns={columns}
            pagination={pagination}
            success={success}
            onDelete={(id) => deleteTenant(Number(id))}
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
