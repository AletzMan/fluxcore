"use client";
import { useState } from "react";
import { Dialog, Avatar } from "lambda-ui-components";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Brand } from "@/typesModels/Brand";
import { Pagination } from "@/typesAPI/common.types";
import { FormBrand } from "../../nuevo/components/FormBrand/FormBrand";
import styles from "./BrandView.module.scss";
import Image from "next/image";

interface BrandViewProps {
    brands: Brand[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const BrandView = ({ brands, pagination, success, isMaintenance }: BrandViewProps) => {
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEdit = (brand: Brand) => {
        setSelectedBrand(brand);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setTimeout(() => setSelectedBrand(null), 300); // delay to unmount cleanly
    };

    const columns: DataTableColumn<Brand>[] = [
        {
            sortKey: "id",
            nameColumn: "Nº",
            isSortable: true,
            width: "60px",
            render: (brand) => brand.id.toString()
        },
        {
            sortKey: "logo",
            nameColumn: "Logotipo",
            isSortable: false,
            width: "80px",
            render: (brand) => (
                <div className={styles.logoWrapper}>
                    {brand.urlLogo ? (
                        <div className={styles.logoWrapper_container}>
                            <Image className={styles.logoWrapper_img} src={brand.urlLogo} alt={brand.name} width={32} height={32} unoptimized />
                        </div>
                    ) : (
                        <Avatar name={brand.name} size="small" />
                    )}
                </div>
            )
        },
        {
            sortKey: "name",
            nameColumn: "Nombre de Marca",
            isSortable: true,
            width: "200px",
            render: (brand) => <strong className={styles.name}>{brand.name}</strong>
        },
        {
            sortKey: "description",
            nameColumn: "Descripción",
            isSortable: true,
            render: (brand) => brand.description || <span className={styles.descriptionEmpty}>Sin descripción</span>
        }
    ];

    return (
        <>
            <DataTable
                data={brands}
                columns={columns}
                pagination={pagination}
                success={success}
                isMaintenance={isMaintenance || false}
                actions={["edit", "delete"]}
                onEdit={handleEdit}
                hasAddButton={true}
                urlAddButton="/catalogo/marcas/nuevo"
                filters={[]}
            />

            <Dialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                title="Editar Marca"
            >
                {selectedBrand && (
                    <div className={styles.dialogContent}>
                        <FormBrand
                            brand={selectedBrand}
                            onSuccess={handleCloseDialog}
                            onCancel={handleCloseDialog}
                        />
                    </div>
                )}
            </Dialog>
        </>
    );
};
