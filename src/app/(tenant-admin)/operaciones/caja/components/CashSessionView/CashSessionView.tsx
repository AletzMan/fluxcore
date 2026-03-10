"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { CashSession } from "@/typesModels/CashSession";
import { Pagination } from "@/typesAPI/common.types";
import { formatCurrency } from "@/lib/utils/common-utils";

interface CashSessionViewProps {
    sessions: CashSession[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const CashSessionView = ({ sessions, pagination, success, isMaintenance }: CashSessionViewProps) => {
    const columns: DataTableColumn<CashSession>[] = [
        {
            sortKey: "id",
            nameColumn: "Nº",
            isSortable: true,
            render: (session) => session.id.toString()
        },
        {
            sortKey: "userName",
            nameColumn: "Usuario / Cajero",
            isSortable: true,
            render: (session) => session.userName
        },
        {
            sortKey: "openingDate",
            nameColumn: "Apertura",
            isSortable: true,
            type: "date",
            render: (session) => new Date(session.openingDate).toLocaleString()
        },
        {
            sortKey: "closingDate",
            nameColumn: "Cierre",
            isSortable: true,
            type: "date",
            render: (session) => session.closingDate ? new Date(session.closingDate).toLocaleString() : 'En curso'
        },
        {
            sortKey: "openingBalance",
            nameColumn: "Fondo Inicial",
            isSortable: true,
            align: "right",
            render: (session) => formatCurrency(session.openingBalance)
        },
        {
            sortKey: "status",
            nameColumn: "Estado",
            isSortable: true,
            render: (session) => session.status
        }
    ];

    return (
        <DataTable
            data={sessions}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["view"]}
            hasAddButton={false}
            filters={[
                { id: '1', key: 'status', value: 'OPEN', label: 'Abierta', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '2', key: 'status', value: 'CLOSE', label: 'Cerrada', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '3', key: 'fromDate', value: '', label: 'Desde', type: 'date', nameGroup: 'Fecha' },
                { id: '4', key: 'toDate', value: '', label: 'Hasta', type: 'date', nameGroup: 'Fecha' },
                { id: '5', key: 'onlyWithDiscrepancies', value: 'true', label: 'Ver discrepancias', type: 'multiple-choice', nameGroup: 'Otros Filtros' }
            ]}
        />
    );
};
