"use client";
import { useState } from "react";
import { Dialog } from "lambda-ui-components";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Category } from "@/typesModels/Category";
import { Pagination } from "@/typesAPI/common.types";
import { FormCategory } from "../../nuevo/components/FormCategory/FormCategory";
import styles from "./CategoryView.module.scss";

interface CategoryViewProps {
    categories: Category[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const CategoryView = ({ categories, pagination, success, isMaintenance }: CategoryViewProps) => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setTimeout(() => setSelectedCategory(null), 300); // delay to unmount cleanly
    };

    const columns: DataTableColumn<Category>[] = [
        {
            sortKey: "id",
            nameColumn: "Nº",
            isSortable: true,
            width: "60px",
            render: (category) => category.id.toString()
        },
        {
            sortKey: "name",
            nameColumn: "Nombre de Categoría",
            isSortable: true,
            width: "200px",
            render: (category) => <strong className={styles.name}>{category.name}</strong>
        },
        {
            sortKey: "description",
            nameColumn: "Descripción",
            isSortable: true,
            render: (category) => category.description || <span className={styles.descriptionEmpty}>Sin descripción</span>
        }
    ];

    return (
        <>
            <DataTable
                data={categories}
                columns={columns}
                pagination={pagination}
                success={success}
                isMaintenance={isMaintenance || false}
                actions={["edit", "delete"]}
                onEdit={handleEdit}
                hasAddButton={true}
                urlAddButton="/catalogo/categorias/nuevo"
                filters={[]}
            />

            <Dialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                title="Editar Categoría"
            >
                {selectedCategory && (
                    <div className={styles.dialogContent}>
                        <FormCategory
                            category={selectedCategory}
                            onSuccess={handleCloseDialog}
                            onCancel={handleCloseDialog}
                        />
                    </div>
                )}
            </Dialog>
        </>
    );
};
