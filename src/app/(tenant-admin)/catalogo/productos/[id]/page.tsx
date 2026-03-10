import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { productMasterService } from "@/app/services/api/product-master.service";
import { productVariantService } from "@/app/services/api/product-variant.service";
import { Suspense } from "react";
import { ProductVariantParams } from "@/typesAPI/product-variant";
import styles from "../Productspage.module.scss";
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
            <div className={styles.container} style={{ padding: 'var(--spacing-md)' }}>
                <Suspense fallback={<div>Cargando ficha base...</div>}>
                    <ProductMasterDetail id={id} />
                </Suspense>

                <div style={{ marginTop: 'var(--spacing-xl)', flex: 1 }}>
                    <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Variantes de este Producto</h3>
                    <p style={{ color: 'var(--muted-color)', marginBottom: 'var(--spacing-md)' }}>
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
        return <div style={{ color: 'red' }}>Error al cargar la información base del catálogo.</div>;
    }

    if (!master) {
        return <div>Producto base no encontrado.</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--primary-color)' }}>{master.name}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                <div style={{ padding: 'var(--spacing-md)', background: 'var(--surface-b)', borderRadius: 'var(--radius-box)' }}>
                    <strong>Descripción:</strong> <p style={{ margin: 0, color: 'var(--muted-color)' }}>{master.description || 'Sin descripción'}</p>
                </div>
                <div style={{ padding: 'var(--spacing-md)', background: 'var(--surface-b)', borderRadius: 'var(--radius-box)' }}>
                    <strong>Marca (ID):</strong> <p style={{ margin: 0 }}>{master.brandId || 'N/A'}</p>
                </div>
                <div style={{ padding: 'var(--spacing-md)', background: 'var(--surface-b)', borderRadius: 'var(--radius-box)' }}>
                    <strong>Categoría (ID):</strong> <p style={{ margin: 0 }}>{master.categoryId || 'N/A'}</p>
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
        <div style={{ height: '450px' }}>
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
