"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { ProductMaster } from "@/typesModels/ProductMaster";
import { Pagination } from "@/typesAPI/common.types";
import styles from "./ProductMasterView.module.scss";

interface ProductMasterViewProps {
    products: ProductMaster[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const ProductMasterView = ({ products, pagination, success, isMaintenance }: ProductMasterViewProps) => {
    const columns: DataTableColumn<ProductMaster>[] = [
        {
            sortKey: "id",
            nameColumn: "Cód.",
            isSortable: true,
            render: (product) => product.id.toString()
        },
        {
            sortKey: "name",
            nameColumn: "Producto",
            isSortable: true,
            render: (product) => <strong className={styles.name}>{product.name}</strong>
        },
        {
            sortKey: "categoryId",
            nameColumn: "Categoría",
            isSortable: true,
            render: (product) => product.categoryId ? `ID: ${product.categoryId}` : 'Ninguna'
        },
        {
            sortKey: "brandId",
            nameColumn: "Marca",
            isSortable: true,
            render: (product) => product.brandId ? `ID: ${product.brandId}` : 'Ninguna'
        }
    ];

    return (
        <DataTable
            data={products}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["view", "edit", "delete"]}
            hasAddButton={true}
            urlAddButton="/catalogo/productos/nuevo"
            filters={[]}
        />
    );
};
