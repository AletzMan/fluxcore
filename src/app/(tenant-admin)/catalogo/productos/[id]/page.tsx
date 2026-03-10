import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { productMasterService } from "@/app/services/api/product-master.service";
import { productVariantService } from "@/app/services/api/product-variant.service";
import { Suspense } from "react";
import { ProductVariantParams } from "@/typesAPI/product-variant";
import globalStyles from "../Productspage.module.scss";
import styles from "./ProductDetailPage.module.scss";
import { ProductVariantView } from "./components/ProductVariantView/ProductVariantView";

export default async function ProductDetailPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }> | { id: string },
    searchParams: Promise<ProductVariantParams> | ProductVariantParams
}) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    return (
        <ContainerSection
            title={`Detalles del Producto #${id}`}
            description="Aquí se resume la familia o tipo de producto maestro, y a continuación puedes ver o añadir las versiones específicas (variantes) del mismo."
        >
            <div className={`${globalStyles.container} ${styles.productDetailPage}`}>
                <Suspense fallback={<div>Cargando ficha base...</div>}>
                    <ProductMasterDetail id={id} />
                </Suspense>

                <div className={styles.variantsSection}>
                    <h3 className={styles.variantsSectionTitle}>Variantes de este Producto</h3>
                    <p className={styles.variantsSectionDesc}>
                        Administra el SKU, precios o tallas dependientes de este diseño base.
                    </p>
                    <Suspense fallback={<div>Cargando inventario de variantes...</div>}>
                        <VariantsListWrapper masterId={Number(id)} searchParams={searchParams} />
                    </Suspense>
                </div>
            </div>
        </ContainerSection>
    );
}

// --------------------------------------------------------
// Server Component - Ficha Maestra
// --------------------------------------------------------
async function ProductMasterDetail({ id }: { id: string }) {
    let master;
    try {
        const res = await productMasterService.getProductMasterById(id);
        master = res.data;
    } catch {
        return <div className={styles.errorText}>Error al cargar la información base del catálogo.</div>;
    }

    if (!master) {
        return <div>Producto base no encontrado.</div>;
    }

    return (
        <div className={styles.masterDetailCard}>
            <h2 className={styles.masterTitle}>{master.name}</h2>
            <div className={styles.masterGrid}>
                <div className={styles.masterBox}>
                    <strong>Descripción:</strong> <p className={styles.masterBoxDescription}>{master.description || 'Sin descripción'}</p>
                </div>
                <div className={styles.masterBox}>
                    <strong>Marca (ID):</strong> <p className={styles.masterBoxValue}>{master.brandId || 'N/A'}</p>
                </div>
                <div className={styles.masterBox}>
                    <strong>Categoría (ID):</strong> <p className={styles.masterBoxValue}>{master.categoryId || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

// --------------------------------------------------------
// Server Component Wrapper - Lista de Variantes (Tabla)
// --------------------------------------------------------
async function VariantsListWrapper({ masterId, searchParams }: { masterId: number, searchParams: Promise<ProductVariantParams> | ProductVariantParams }) {
    const params = await searchParams;
    let variantsRes;

    try {
        variantsRes = await productVariantService.getAllProductVariants({
            ...params,
            productMaster: masterId
        });
    } catch {
        variantsRes = { success: false, data: [] } as any;
    }

    return (
        <div className={styles.variantsTableWrapper}>
            <ProductVariantView
                variants={variantsRes?.data || []}
                pagination={variantsRes?.pagination!}
                success={variantsRes?.success}
                isMaintenance={variantsRes?.errorCode === "SERVICE_UNAVAILABLE"}
                masterId={masterId}
            />
        </div>
    );
}
