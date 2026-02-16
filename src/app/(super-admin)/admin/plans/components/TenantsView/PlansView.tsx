"use client"
import { DataTable, DataTableColumn } from "@/pp/components/ui/DataTable/DataTable";
import { Pagination } from "@/typesAPI/common.types";
import { Plan } from "@/typesModels/Plan";
import { Tag } from "lambda-ui-components";
import styles from "./PlansView.module.scss";
import { formatDateTimeShort } from "@/utils/common-utils";

interface PlansViewProps {
    plans: Plan[];
    pagination: Pagination;
    success?: boolean;
}

export const PlansView = ({ plans, pagination, success }: PlansViewProps) => {

    return (
        <DataTable<Plan>
            data={plans || []}
            columns={columns}
            pagination={pagination}
            success={success}
            actions={[
                "view",
                "edit",
                "delete"
            ]}
            filters={[
                { id: '1', key: 'isActive', value: 'true', label: 'Activo', optionalLabel: 'Inactivo', type: 'boolean', nameGroup: 'Estado' },
            ]}
        />
    );
}


const columns: DataTableColumn<Plan>[] = [
    {
        sortKey: 'id',
        nameColumn: 'Id',
        type: 'number',
        width: '75px',
        align: 'center',
        isSortable: true,
        render: (plan) => plan.id,
    },
    {
        sortKey: 'name',
        nameColumn: 'Nombre',
        type: 'string',
        width: '200px',
        align: 'left',
        isSortable: true,
        render: (plan) => plan.name,
    },
    {
        sortKey: 'description',
        nameColumn: 'Descripción',
        type: 'string',
        width: '200px',
        align: 'center',
        isSortable: true,
        render: (plan) => plan.description,
    },
    {
        sortKey: 'isActive',
        nameColumn: 'Acceso',
        type: 'boolean',
        width: '100px',
        align: 'center',
        isSortable: true,
        render: (tenant) => {
            return (
                tenant.isActive ?
                    <Tag variant="subtle" color="success">Activo</Tag> :
                    <Tag variant="subtle" color="danger">Inactivo</Tag>
            )
        },
    },
    {
        sortKey: 'createdAt',
        nameColumn: 'Creado',
        type: 'date',
        width: '125px',
        align: 'center',
        isSortable: true,
        render: (plan) => formatDateTimeShort(plan.createdAt.toString()),
    },
    {
        sortKey: 'lastModifiedAt',
        nameColumn: 'Actualizado',
        type: 'date',
        width: '125px',
        align: 'center',
        isSortable: true,
        render: (plan) => formatDateTimeShort(plan.lastModifiedAt.toString()),
    }
]



