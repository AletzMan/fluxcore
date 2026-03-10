import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { FormCategory } from "../../nuevo/components/FormCategory/FormCategory";
import { categoryService } from "@/app/services/api/category.service";
import styles from "../../Categorypage.module.scss";

export default async function EditarCategoriaPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = await params;

    let category = null;
    try {
        const response = await categoryService.getCategoryById(resolvedParams.id);
        category = response.data;
    } catch {
        return (
            <ContainerSection title="Editar Categoría" description="No se encontró la categoría solicitada.">
                <div>Categoría no encontrada.</div>
            </ContainerSection>
        );
    }

    if (!category) {
        return (
            <ContainerSection title="Editar Categoría" description="No se encontró la categoría solicitada.">
                <div>Categoría no encontrada.</div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title="Editar Categoría"
            description="Modifica los detalles de la categoría para ajustar la clasificación del inventario."
        >
            <div className={styles.formWrapper}>
                <FormCategory category={category!} />
            </div>
        </ContainerSection>
    );
}
