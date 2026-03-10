"use client";
import { useState } from "react";
import { Dialog } from "lambda-ui-components";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { ProductVariant } from "@/typesModels/ProductVariant";
import { Pagination } from "@/typesAPI/common.types";
import { formatCurrency } from "@/lib/utils/common-utils";
import { FormProductVariant } from "../../variantes/nuevo/components/FormProductVariant/FormProductVariant";
import styles from "./ProductVariantView.module.scss";

interface ProductVariantViewProps {
    variants: ProductVariant[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
    masterId: number;
}

export const ProductVariantView = ({ variants, pagination, success, isMaintenance, masterId }: ProductVariantViewProps) => {
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEdit = (variant: ProductVariant) => {
        setSelectedVariant(variant);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setTimeout(() => setSelectedVariant(null), 300); // delay to unmount cleanly
    };

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
            nameColumn: "Precio Púb.",
            isSortable: true,
            render: (variant) => <strong className={styles.price}>{formatCurrency(variant.price)}</strong>
        },
        {
            sortKey: "minStock",
            nameColumn: "Stock Mínimo",
            isSortable: true,
            render: (variant) => variant.minStock.toString()
        }
    ];

    return (
        <>
            <DataTable
                data={variants}
                columns={columns}
                pagination={pagination}
                success={success}
                isMaintenance={isMaintenance || false}
                actions={["edit", "delete"]}
                onEdit={handleEdit}
                hasAddButton={true}
                urlAddButton={`/catalogo/productos/${masterId}/variantes/nuevo`}
                filters={[]}
            />

            <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog}>
                {selectedVariant && (
                    <div className={styles.dialogContent}>
                        <h2 className={styles.dialogTitle}>Editar Variante</h2>
                        <FormProductVariant
                            productMasterId={masterId}
                            variant={selectedVariant}
                            onSuccess={handleCloseDialog}
                            onCancel={handleCloseDialog}
                        />
                    </div>
                )}
            </Dialog>
        </>
    );
};
