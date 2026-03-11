"use client";
import { useState } from "react";
import { DataTable, DataTableColumn } from "@/app/components/ui/DataTable/DataTable";
import { Customer } from "@/typesModels/Customer";
import { Pagination } from "@/typesAPI/common.types";
import { Tag, useNotification } from "lambda-ui-components";
import { customerService } from "@/app/services/api/customer.service";
import styles from "./CustomerView.module.scss";

interface CustomerViewProps {
    customers: Customer[];
    pagination: Pagination;
    success?: boolean;
    isMaintenance?: boolean;
}

export const CustomerView = ({ customers, pagination, success, isMaintenance }: CustomerViewProps) => {
    const { showNotification } = useNotification();

    const deleteCustomer = async (id: number) => {
        try {
            const response = await customerService.deactivateCustomer(id);

            if (response.success) {
                setTimeout(() => {
                    document.location.reload();
                }, 1000);
                showNotification({
                    message: "Cliente desactivado correctamente",
                    notificationType: "success",
                });
            } else {
                showNotification({
                    message: response.message || "Error al desactivar el cliente",
                    notificationType: "danger",
                });
            }
        } catch (error) {
            showNotification({
                message: "Error de red al desactivar el cliente",
                notificationType: "danger",
            });
        }
    };

    const columns: DataTableColumn<Customer>[] = [
        {
            sortKey: "id",
            nameColumn: "Nº",
            isSortable: true,
            width: "60px",
            render: (customer) => customer.id.toString()
        },
        {
            sortKey: "firstName",
            nameColumn: "Nombre Completo",
            isSortable: true,
            width: "250px",
            render: (customer) => (
                <div>
                    <strong className={styles.name}>{customer.firstName} {customer.lastName}</strong>
                    <div className={styles.email}>{customer.email}</div>
                </div>
            )
        },
        {
            sortKey: "rfc",
            nameColumn: "RFC",
            isSortable: true,
            width: "140px",
            render: (customer) => customer.rfc
        },
        {
            sortKey: "phoneNumber",
            nameColumn: "Teléfono",
            isSortable: false,
            width: "120px",
            render: (customer) => customer.phoneNumber
        },
        {
            sortKey: "currentBalance",
            nameColumn: "Saldo",
            isSortable: true,
            width: "120px",
            align: "right",
            render: (customer) => {
                const balance = customer.currentBalance || 0;
                return (
                    <span className={`${styles.balance} ${balance > 0 ? styles.positiveBalance : balance < 0 ? styles.negativeBalance : ''}`}>
                        ${balance.toFixed(2)}
                    </span>
                );
            }
        },
        {
            sortKey: "isActive",
            nameColumn: "Estado",
            isSortable: true,
            width: "100px",
            render: (customer) => (
                <Tag
                    size="small"
                    variant="subtle"
                    color={customer.isActive ? "success" : "neutral"}
                >
                    {customer.isActive ? "Activo" : "Inactivo"}
                </Tag>
            )
        }
    ];

    return (
        <DataTable
            data={customers}
            columns={columns}
            pagination={pagination}
            success={success}
            isMaintenance={isMaintenance || false}
            actions={["view", "delete"]}
            onDelete={(id) => deleteCustomer(Number(id))}
            hasAddButton={true}
            urlAddButton="/personas/clientes/nuevo"
            filters={[
                { id: "f_act", key: "isActive", value: "true", label: "Solo Activos", type: "boolean", nameGroup: "Estado" },
                { id: "f_inact", key: "isActive", value: "false", label: "Inactivos", type: "boolean", nameGroup: "Estado" },
                { id: "f_bal", key: "hasBalance", value: "true", label: "Con Saldo", type: "boolean", nameGroup: "Finanzas" }
            ]}
        />
    );
};
