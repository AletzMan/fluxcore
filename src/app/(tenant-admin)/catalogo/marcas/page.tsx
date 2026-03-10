import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { brandService } from "@/app/services/api/brand.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { Brand } from "@/typesModels/Brand";
import { BrandParams } from "@/typesAPI/brand.type";
import { BrandView } from "./components/BrandView/BrandView";
import styles from "./Brandpage.module.scss";

const getBrands = async (params: Partial<BrandParams>) => {
    try {
        return await brandService.getAllBrands(params);
    } catch (error: any) {
        return { success: false, data: [], errorCode: error?.errorCode } as unknown as PagedResponse<Brand>;
    }
}

export default async function BrandPage({ searchParams }: {
    searchParams: Promise<Partial<BrandParams>> | Partial<BrandParams>
}) {
    const params = await searchParams;
    const brands = await getBrands({ ...params });

    return (
        <ContainerSection
            title="Marcas"
            description="Administra las marcas de tus productos y su descripción."
            titleAddButton="Nueva Marca"
            hrefAddButton="/catalogo/marcas/nuevo"
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando marcas...</div>}>
                    <BrandView
                        brands={brands?.data || []}
                        pagination={brands?.pagination!}
                        success={brands?.success}
                        isMaintenance={brands?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
