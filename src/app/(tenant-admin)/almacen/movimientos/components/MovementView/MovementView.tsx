"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Movement } from "@/typesModels/Movement";
import { Pagination } from "@/typesAPI/common.types";
import styles from "./MovementView.module.scss";
import { Tag } from "lambda-ui-components";

interface MovementViewProps {
    movements: Movement[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

const movementTypeTranslations: Record<string, string> = {
    "100": "Compra",
    "PURCHASE_RECEIPT": "Compra",
    "101": "Devolución Cliente",
    "CUSTOMER_RETURN": "Devolución Cliente",
    "102": "Ajuste Positivo",
    "POSITIVE_ADJUSTMENT": "Ajuste Positivo",
    "103": "Transferencia Entrante",
    "TRANSFER_IN": "Transferencia Entrante",
    "200": "Venta",
    "SALE": "Venta",
    "201": "Merma/Deterioro",
    "SPOILAGE": "Merma/Deterioro",
    "202": "Ajuste Negativo",
    "NEGATIVE_ADJUSTMENT": "Ajuste Negativo",
    "203": "Transferencia Saliente",
    "TRANSFER_OUT": "Transferencia Saliente",
    "204": "Consumo Interno",
    "INTERNAL_CONSUMPTION": "Consumo Interno"
};

const getMovementTypeColor = (type: string) => {
    const t = type.toString().toUpperCase();
    if (["100", "PURCHASE_RECEIPT", "102", "POSITIVE_ADJUSTMENT", "103", "TRANSFER_IN"].includes(t)) {
        return "success";
    }
    if (["200", "SALE", "201", "SPOILAGE", "202", "NEGATIVE_ADJUSTMENT", "203", "TRANSFER_OUT", "204", "INTERNAL_CONSUMPTION"].includes(t)) {
        return "danger";
    }
    return "primary";
};

export const MovementView = ({ movements, pagination, success, isMaintenance }: MovementViewProps) => {

    const columns: DataTableColumn<Movement>[] = [
        {
            sortKey: "movementCode",
            nameColumn: "Cód. Movimiento",
            isSortable: true,
            width: "140px",
            render: (movement) => <strong className={styles.code}>{movement.movementCode}</strong>
        },
        {
            sortKey: "type",
            nameColumn: "Tipo",
            isSortable: true,
            width: "180px",
            render: (movement) => (
                <Tag
                    size="small"
                    variant="subtle"
                    color={getMovementTypeColor(movement.type)}
                >
                    {movementTypeTranslations[movement.type] || movement.type}
                </Tag>
            )
        },
        {
            sortKey: "quantityChanged",
            nameColumn: "Cantidad",
            isSortable: true,
            width: "100px",
            align: "right",
            render: (movement) => {
                const isPositive = movement.quantityChanged > 0;
                return (
                    <span className={isPositive ? styles.positive : styles.negative}>
                        {isPositive ? "+" : ""}{movement.quantityChanged}
                    </span>
                )
            }
        },
        {
            sortKey: "stockAfterMovement",
            nameColumn: "Stock Final",
            isSortable: false,
            width: "100px",
            align: "right",
            render: (movement) => movement.stockAfterMovement
        },
        {
            sortKey: "userName",
            nameColumn: "Usuario",
            isSortable: true,
            width: "150px",
            render: (movement) => movement.userName || "Sistema"
        },
        {
            sortKey: "timestamp",
            nameColumn: "Fecha",
            isSortable: true,
            width: "150px",
            render: (movement) => new Date(movement.timestamp).toLocaleString("es-MX", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        }
    ];

    return (
        <DataTable
            data={movements}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["view"]}
            hasAddButton={false}
            filters={[
                { id: "fromDate", key: "fromDate", value: "2024-01-01", label: "Desde", type: "date", nameGroup: "Fecha" },
                { id: "toDate", key: "toDate", value: "2024-01-01", label: "Hasta", type: "date", nameGroup: "Fecha" },
                { id: "t100", key: "type", value: "100", label: "Compra", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t101", key: "type", value: "101", label: "Devolución Cliente", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t102", key: "type", value: "102", label: "Ajuste Positivo", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t103", key: "type", value: "103", label: "Transferencia Entrante", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t200", key: "type", value: "200", label: "Venta", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t201", key: "type", value: "201", label: "Merma/Deterioro", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t202", key: "type", value: "202", label: "Ajuste Negativo", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t203", key: "type", value: "203", label: "Transferencia Saliente", type: "multiple-choice", nameGroup: "Tipo de Movimiento" },
                { id: "t204", key: "type", value: "204", label: "Consumo Interno", type: "multiple-choice", nameGroup: "Tipo de Movimiento" }
            ]}
        />
    );
};
