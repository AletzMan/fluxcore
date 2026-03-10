"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Category } from "@/typesModels/Category";
import { Pagination } from "@/typesAPI/common.types";

interface CategoryViewProps {
    categories: Category[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const CategoryView = ({ categories, pagination, success, isMaintenance }: CategoryViewProps) => {
    const columns: DataTableColumn<Category>[] = [
        {
            sortKey: "id",
            nameColumn: "Nº",
            isSortable: true,
            render: (category) => category.id.toString()
        },
        {
            sortKey: "name",
            nameColumn: "Nombre de Categoría",
            isSortable: true,
            render: (category) => <strong style={{ color: 'var(--primary-color)' }}>{category.name}</strong>
        },
        {
            sortKey: "description",
            nameColumn: "Descripción",
            isSortable: true,
            render: (category) => category.description || <span style={{ color: 'var(--muted-color)' }}>Sin descripción</span>
        }
    ];

    return (
        <DataTable
            data={categories}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["edit", "delete"]}
            hasAddButton={true}
            urlAddButton="/catalogo/categorias/nuevo"
            filters={[]}
        />
    );
};
