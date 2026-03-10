import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { productMasterService } from "@/app/services/api/product-master.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { ProductMaster } from "@/typesModels/ProductMaster";
import { ProductMasterParams } from "@/typesAPI/product-master";
import styles from "./Productspage.module.scss";
import { ProductMasterView } from "./components/ProductMasterView/ProductMasterView";

const getProducts = async (params: ProductMasterParams) => {
    try {
        return await productMasterService.getAllProductMasters(params);
    } catch {
        return { success: false, data: [] } as unknown as PagedResponse<ProductMaster>;
    }
}

export default async function ProductosPage({ searchParams }: {
    searchParams: Promise<ProductMasterParams> | ProductMasterParams
}) {
    const params = await searchParams;
    const products = await getProducts({ ...params });

    return (
        <ContainerSection
            title="Productos Maestros"
            description="Agrega y actualiza la información general de los productos que vendes. Desde aquí podrás acceder a sus variantes (tallas, colores)."
            titleAddButton="Nuevo Producto"
            hrefAddButton="/catalogo/productos/nuevo"
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando catálogo...</div>}>
                    <ProductMasterView
                        products={products?.data || []}
                        pagination={products?.pagination!}
                        success={products?.success}
                        isMaintenance={products?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
