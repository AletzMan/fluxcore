import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { providerService } from "@/app/services/api/provider.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { Provider } from "@/typesModels/Provider";
import { ProviderParams } from "@/typesAPI/provider.types";
import { ProviderView } from "./components/ProviderView/ProviderView";
import styles from "./ProviderPage.module.scss";

const getProviders = async (params: Partial<ProviderParams>) => {
    try {
        return await providerService.getProviders(params);
    } catch (error: any) {
        return { success: false, data: [], errorCode: error?.errorCode } as unknown as PagedResponse<Provider>;
    }
}

export default async function ProveedoresPage({ searchParams }: {
    searchParams: Promise<Partial<ProviderParams>> | Partial<ProviderParams>
}) {
    const params = await searchParams;
    const providers = await getProviders({ ...params });

    return (
        <ContainerSection
            title="Directorio de Proveedores"
            breadcrumb={[
                { label: "Personas", href: "/personas" },
                { label: "Proveedores", href: "/personas/proveedores" },
            ]}
            titleAddButton="Nuevo Proveedor"
            hrefAddButton="/personas/proveedores/nuevo"
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando proveedores...</div>}>
                    <ProviderView
                        providers={providers?.data || []}
                        pagination={providers?.pagination!}
                        success={providers?.success}
                        isMaintenance={providers?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
