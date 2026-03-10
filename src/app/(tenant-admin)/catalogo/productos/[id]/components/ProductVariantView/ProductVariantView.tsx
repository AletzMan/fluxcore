"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { ProductVariant } from "@/typesModels/ProductVariant";
import { Pagination } from "@/typesAPI/common.types";
import { formatCurrency } from "@/lib/utils/common-utils";

interface ProductVariantViewProps {
    variants: ProductVariant[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
    masterId: number;
}

export const ProductVariantView = ({ variants, pagination, success, isMaintenance, masterId }: ProductVariantViewProps) => {
    const columns: DataTableColumn<ProductVariant>[] = [
        {
            sortKey: "id",
            nameColumn: "Nº Variante",
            isSortable: true,
            render: (variant) => variant.id.toString()
        },
        {
            sortKey: "sku",
            nameColumn: "SKU",
            isSortable: true,
            render: (variant) => variant.sku || 'N/A'
        },
        {
            sortKey: "barcode",
            nameColumn: "Código de Barras",
            isSortable: true,
            render: (variant) => variant.barcode || 'N/A'
        },
        {
            sortKey: "price",
            nameColumn: "Precio Público",
            isSortable: true,
            align: 'right',
            render: (variant) => <strong style={{ color: 'var(--success-color)' }}>{formatCurrency(variant.price)}</strong>
        },
        {
            sortKey: "minStock",
            nameColumn: "Stock Mínimo",
            isSortable: true,
            render: (variant) => variant.minStock.toString()
        }
    ];

    return (
        <DataTable
            data={variants}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["edit", "delete"]}
            hasAddButton={true}
            urlAddButton={`/catalogo/productos/${masterId}/variantes/nuevo`}
            filters={[]}
        />
    );
};
