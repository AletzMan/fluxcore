"use client"
import { DataTable, DataTableColumn } from "@/pp/components/ui/DataTable/DataTable";
import { Pagination } from "@/typesAPI/common.types";
import { Subscription } from "@/typesModels/Subscription";
import { Tag, useNotification } from "lambda-ui-components";
import styles from "./SubscriptionsView.module.scss";
import { formatDateTimeShort } from "@/utils/common-utils";
import { subscriptionService } from "@/pp/services/api/subscription.service";
import { ErrorMessages } from "@/lib/errors/message-errors";
import { statusComponent, getStatusColor } from "@/pp/constants/common";

interface SubscriptionsViewProps {
    subscriptions: Subscription[];
    pagination: Pagination;
    success?: boolean;
}

export const SubscriptionsView = ({ subscriptions, pagination, success }: SubscriptionsViewProps) => {
    const { showNotification } = useNotification();

    const deleteSubscription = async (id: number) => {
        try {
            const response = await subscriptionService.deleteSubscription(id);

            if (response.success) {
                setTimeout(() => {
                    document.location.reload();
                }, 5000);
                showNotification({
                    message: "Suscripción eliminada correctamente",
                    notificationType: "success",
                });
            } else {
                showNotification({
                    message: ErrorMessages[response.code] || "Error al eliminar la suscripción",
                    notificationType: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: "Error al eliminar la suscripción",
                notificationType: "danger",
            });
        }
    }

    return (
        <DataTable<Subscription>
            data={subscriptions}
            columns={columns}
            pagination={pagination}
            success={success}
            onDelete={(id) => deleteSubscription(Number(id))}
            actions={[
                "view",
                "delete"
            ]}
            filters={[
                { id: '1', key: 'status', value: '1', label: 'Activo', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '2', key: 'status', value: '2', label: 'Trial', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '3', key: 'status', value: '3', label: 'Expirado', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '4', key: 'status', value: '4', label: 'Cancelado', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '5', key: 'createdFrom', value: '2022-01-01', label: 'Desde', type: 'date', nameGroup: 'Fecha de creación' },
                { id: '6', key: 'createdTo', value: '2022-01-01', label: 'Hasta', type: 'date', nameGroup: 'Fecha de creación' },
            ]}
        />
    );
}

const columns: DataTableColumn<Subscription>[] = [
    {
        sortKey: 'id',
        nameColumn: 'Id',
        type: 'number',
        width: '50px',
        align: 'center',
        isSortable: true,
        render: (sub) => sub.id,
    },
    {
        sortKey: 'tenantName',
        nameColumn: 'Empresa',
        type: 'string',
        width: '180px',
        align: 'center',
        isSortable: true,
        render: (sub) => sub.tenantName,
    },
    {
        sortKey: 'status',
        nameColumn: 'Estado',
        type: 'string',
        width: '80px',
        align: 'center',
        isSortable: true,
        render: (sub) => (
            <Tag
                text={statusComponent[sub.status as keyof typeof statusComponent] || sub.status}
                color={getStatusColor(sub.status as any)}
                size='tiny'
                radius='small'
                variant='subtle'
            />
        ),
    },
    {
        sortKey: 'billingCycle',
        nameColumn: 'Ciclo',
        type: 'string',
        width: '80px',
        align: 'center',
        isSortable: true,
        render: (sub) => sub.billingCycle,
    },
    {
        sortKey: 'nextBillingDate',
        nameColumn: 'Próx. Cobro',
        type: 'date',
        width: '80px',
        align: 'center',
        isSortable: true,
        render: (sub) => sub.nextBillingDate ? formatDateTimeShort(sub.nextBillingDate.toString()) : "N/A",
    },
    {
        sortKey: 'createdAt',
        nameColumn: 'Creado',
        type: 'date',
        width: '80px',
        align: 'center',
        isSortable: true,
        render: (sub) => sub.createdAt ? formatDateTimeShort(sub.createdAt.toString()) : "N/A",
    }
]
