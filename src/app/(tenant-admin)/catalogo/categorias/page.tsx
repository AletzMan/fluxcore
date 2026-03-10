import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { categoryService } from "@/app/services/api/category.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { Category } from "@/typesModels/Category";
import { CategoryParams } from "@/typesAPI/category.types";
import { CategoryView } from "./components/CategoryView/CategoryView";
import styles from "./Categorypage.module.scss";

const getCategories = async (params: Partial<CategoryParams>) => {
    try {
        return await categoryService.getAllCategories(params);
    } catch {
        return { success: false, data: [] } as unknown as PagedResponse<Category>;
    }
}

export default async function CategoriasPage({ searchParams }: {
    searchParams: Promise<Partial<CategoryParams>> | Partial<CategoryParams>
}) {
    const params = await searchParams;
    const categories = await getCategories({ ...params });

    return (
        <ContainerSection
            title="Categorías"
            description="Agrupa y clasifica tus productos mediante categorías para facilitar su localización en el catálogo y sistema de punto de venta."
            titleAddButton="Nueva Categoría"
            hrefAddButton="/catalogo/categorias/nuevo"
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando categorías...</div>}>
                    <CategoryView
                        categories={categories?.data || []}
                        pagination={categories?.pagination!}
                        success={categories?.success}
                        isMaintenance={categories?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
