"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Inventory } from "@/typesModels/Inventory";
import { Pagination } from "@/typesAPI/common.types";
import { formatCurrency } from "@/lib/utils/common-utils";
import { Tag } from "lambda-ui-components";

interface InventoryViewProps {
    inventoryRows: Inventory[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const InventoryView = ({ inventoryRows, pagination, success, isMaintenance }: InventoryViewProps) => {
    const columns: DataTableColumn<Inventory>[] = [
        {
            sortKey: "barcode",
            nameColumn: "Código / SKU",
            isSortable: true,
            render: (item) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontWeight: 500 }}>{item.barcode}</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--foreground-secondary-color)' }}>{item.sku}</span>
                </div>
            )
        },
        {
            sortKey: "productName",
            nameColumn: "Producto",
            isSortable: true,
            render: (item) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontWeight: 500 }}>{item.productName}</span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--foreground-secondary-color)' }}>{item.variantName}</span>
                </div>
            )
        },
        {
            sortKey: "categoryName",
            nameColumn: "Categoría",
            isSortable: true,
            render: (item) => item.categoryName
        },
        {
            sortKey: "price",
            nameColumn: "Precio Unit.",
            isSortable: true,
            align: "right",
            render: (item) => formatCurrency(item.price)
        },
        {
            sortKey: "stockQuantity",
            nameColumn: "Stock Actual",
            isSortable: true,
            align: "center",
            render: (item) => {
                let color: 'success' | 'warning' | 'danger' | 'info' = 'success';
                let text = item.stockQuantity.toString();

                if (item.stockQuantity <= 0) {
                    color = 'danger';
                    text = 'Agotado';
                } else if (item.stockQuantity <= item.minStock) {
                    color = 'warning';
                } else if (item.stockQuantity >= item.maxStock) {
                    color = 'info';
                }

                return (
                    <Tag
                        text={item.stockQuantity <= 0 ? text : `${item.stockQuantity} unid.`}
                        color={color}
                        size="tiny"
                        variant="subtle"
                        radius="small"
                    />
                );
            }
        }
    ];

    return (
        <DataTable
            data={inventoryRows}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            hasAddButton={false}
            filters={[
                // Filtros booleanos mappeados a un multiple-choice o boolean en el backend
                { key: 'isLowStock', value: 'true', label: 'Bajo Stock', type: 'boolean', nameGroup: 'Estado de Stock' },
                { key: 'isOutOfStock', value: 'true', label: 'Agotado', type: 'boolean', nameGroup: 'Estado de Stock' },
                { key: 'isOverStocked', value: 'true', label: 'Sobre Stock', type: 'boolean', nameGroup: 'Estado de Stock' },
            ]}
        />
    );
};
