"use client";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Provider } from "@/typesModels/Provider";
import { Pagination } from "@/typesAPI/common.types";
import { useNotification } from "lambda-ui-components";
import { providerService } from "@/app/services/api/provider.service";
import styles from "./ProviderView.module.scss";

interface ProviderViewProps {
    providers: Provider[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const ProviderView = ({ providers, pagination, success, isMaintenance }: ProviderViewProps) => {
    const { showNotification } = useNotification();

    const deleteProvider = async (id: number) => {
        try {
            const response = await providerService.deleteProvider(id);

            if (response.success) {
                setTimeout(() => {
                    document.location.reload();
                }, 1000);
                showNotification({
                    message: "Proveedor desactivado correctamente",
                    notificationType: "success",
                });
            } else {
                showNotification({
                    message: response.message || "Error al desactivar el proveedor",
                    notificationType: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: "Error de red al desactivar el proveedor",
                notificationType: "danger",
            });
        }
    };

    const columns: DataTableColumn<Provider>[] = [
        {
            sortKey: "id",
            nameColumn: "Nº",
            isSortable: true,
            align: "center",
            width: "60px",
            render: (provider) => provider.id.toString()
        },
        {
            sortKey: "companyName",
            nameColumn: "Empresa",
            isSortable: true,
            width: "200px",
            render: (provider) => <strong className={styles.company}>{provider.companyName}</strong>
        },
        {
            sortKey: "contactName",
            nameColumn: "Contacto Principal",
            isSortable: true,
            width: "250px",
            render: (provider) => (
                <div className={styles.contact}>
                    <p className={styles.name}>{provider.contactName}</p>
                    <p className={styles.email}>{provider.contactEmail}</p>
                </div>
            )
        },
        {
            sortKey: "rfc",
            nameColumn: "RFC",
            isSortable: true,
            width: "140px",
            render: (provider) => provider.rfc
        },
        {
            sortKey: "contactPhone",
            nameColumn: "Teléfono",
            isSortable: false,
            width: "120px",
            render: (provider) => provider.contactPhone
        }
    ];

    return (
        <DataTable
            data={providers}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["view", "delete"]}
            onDelete={(id) => deleteProvider(Number(id))}
            hasAddButton={true}
            urlAddButton="/personas/proveedores/nuevo"
        />
    );
};
