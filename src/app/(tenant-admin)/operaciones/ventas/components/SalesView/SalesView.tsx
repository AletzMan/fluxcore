"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Sale } from "@/typesModels/Sale";
import { Pagination } from "@/typesAPI/common.types";
import { formatCurrency } from "@/lib/utils/common-utils";

interface SalesViewProps {
    sales: Sale[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const SalesView = ({ sales, pagination, success, isMaintenance }: SalesViewProps) => {
    const columns: DataTableColumn<Sale>[] = [
        {
            sortKey: "ticketNumber",
            nameColumn: "Folio",
            isSortable: true,
            render: (sale) => sale.ticketNumber
        },
        {
            sortKey: "customer",
            nameColumn: "Cliente",
            isSortable: true,
            render: (sale) => sale.customer || 'Mostrador'
        },
        {
            sortKey: "saleDate",
            nameColumn: "Fecha",
            isSortable: true,
            type: "date",
            render: (sale) => new Date(sale.saleDate).toLocaleDateString()
        },
        {
            sortKey: "payments",
            nameColumn: "Método de Pago",
            isSortable: false,
            render: (sale) => sale.payments.join(', ') || 'N/A'
        },
        {
            sortKey: "createdBy",
            nameColumn: "Cajero",
            isSortable: true,
            render: (sale) => sale.createdBy
        },
        {
            sortKey: "finalTotal",
            nameColumn: "Total",
            isSortable: true,
            align: "right",
            render: (sale) => formatCurrency(sale.finalTotal)
        }
    ];

    return (
        <DataTable
            data={sales}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["view"]}
            hasAddButton={false}
            filters={[
                { id: '1', key: 'status', value: 'CREATED', label: 'Creada', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '2', key: 'status', value: 'IN_PROGRESS', label: 'En progreso', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '3', key: 'status', value: 'DRAFT', label: 'Borrador', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '4', key: 'status', value: 'PARTIAL_PAID', label: 'Pago parcial', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '5', key: 'status', value: 'COMPLETED', label: 'Completada', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '6', key: 'status', value: 'CANCELLED', label: 'Cancelada', type: 'multiple-choice', nameGroup: 'Estado' },
                { id: '7', key: 'fromDate', value: '', label: 'Desde', type: 'date', nameGroup: 'Fecha de Venta' },
                { id: '8', key: 'toDate', value: '', label: 'Hasta', type: 'date', nameGroup: 'Fecha de Venta' },
                { id: '9', key: 'paymentMethod', value: 'CASH', label: 'Efectivo', type: 'multiple-choice', nameGroup: 'Método de Pago' },
                { id: '10', key: 'paymentMethod', value: 'CREDIT', label: 'Crédito', type: 'multiple-choice', nameGroup: 'Método de Pago' },
                { id: '11', key: 'paymentMethod', value: 'CREDIT_CARD', label: 'Tarjeta de crédito', type: 'multiple-choice', nameGroup: 'Método de Pago' },
                { id: '12', key: 'paymentMethod', value: 'DEBIT_CARD', label: 'Tarjeta de débito', type: 'multiple-choice', nameGroup: 'Método de Pago' },
                { id: '13', key: 'paymentMethod', value: 'MOBILE_PAYMENT', label: 'Pago móvil', type: 'multiple-choice', nameGroup: 'Método de Pago' },
                { id: '14', key: 'paymentMethod', value: 'TRANSFER', label: 'Transferencia', type: 'multiple-choice', nameGroup: 'Método de Pago' },
                { id: '15', key: 'paymentMethod', value: 'OTHER', label: 'Otro', type: 'multiple-choice', nameGroup: 'Método de Pago' },
            ]}
        />
    );
};
