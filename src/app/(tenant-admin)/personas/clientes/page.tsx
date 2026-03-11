import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { customerService } from "@/app/services/api/customer.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { Customer } from "@/typesModels/Customer";
import { CustomerParams } from "@/typesAPI/customer-types";
import { CustomerView } from "./components/CustomerView/CustomerView";
import styles from "./CustomerPage.module.scss";

const getCustomers = async (params: Partial<CustomerParams>) => {
    try {
        return await customerService.getCustomers(params);
    } catch (error: any) {
        return { success: false, data: [], errorCode: error?.errorCode } as unknown as PagedResponse<Customer>;
    }
}

export default async function ClientesPage({ searchParams }: {
    searchParams: Promise<Partial<CustomerParams>> | Partial<CustomerParams>
}) {
    const params = await searchParams;
    const customers = await getCustomers({ ...params });

    return (
        <ContainerSection
            title="Directorio de Clientes"
            description="Mantén el contacto, perfiles y el historial de comportamiento de tus clientes."
            titleAddButton="Nuevo Cliente"
            hrefAddButton="/personas/clientes/nuevo"
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando clientes...</div>}>
                    <CustomerView
                        customers={customers?.data || []}
                        pagination={customers?.pagination!}
                        success={customers?.success}
                        isMaintenance={customers?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
