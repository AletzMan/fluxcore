"use client";

import { Alert, Button, Input, TextArea } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema, CategoryFormValues } from '@/validations/category.schema';
import { useRouter } from 'next/navigation';
import { createCategoryAction, updateCategoryAction } from '@/app/actions/category.actions';
import { useState } from 'react';
import styles from './FormCategory.module.scss';
import { Category } from '@/typesModels/Category';

interface FormCategoryProps {
    category?: Category;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const FormCategory = ({ category, onSuccess, onCancel }: FormCategoryProps) => {
    const isEditMode = !!category;
    const router = useRouter();
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({
        type: 'idle',
        message: ""
    });

    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<CategoryFormValues>({
        resolver: zodResolver(CategorySchema) as any,
        defaultValues: {
            name: category?.name || "",
            description: category?.description || ""
        }
    });

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });

            const payload = {
                name: data.name,
                description: data.description || undefined
            };

            const result = isEditMode && category
                ? await updateCategoryAction(category.id, payload)
                : await createCategoryAction(payload);

            if (result.success) {
                setStatus({ type: 'success', message: `Categoría ${isEditMode ? 'actualizada' : 'creada'} exitosamente. Regresando...` });
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        router.push(`/catalogo/categorias`);
                    }
                    router.refresh();
                }, 1000);
            } else {
                if (result.fieldErrors) {
                    for (const [field, fieldMessage] of Object.entries(result.fieldErrors)) {
                        setError(field as keyof CategoryFormValues, { type: 'server', message: fieldMessage });
                    }
                }
                setStatus({ type: 'error', message: result.message || "No se pudo guardar la categoría." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Error de red al guardar la categoría." });
        }
    };

    const onError = () => {
        setStatus({ type: 'error', message: "Por favor revisa los campos en rojo. Hay errores de validación." });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
            {status.type === 'error' && (
                <Alert message={status.message} color="danger" onClose={() => setStatus({ type: 'idle', message: '' })} />
            )}
            {status.type === 'success' && (
                <Alert message={status.message} color="success" />
            )}

            <Fieldset title="Información de la Categoría">
                <div className={styles.grid}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="name"
                                label="Nombre de la Categoría"
                                placeholder="Ej. Camisas Cuello V"
                                size="small"
                                errorMessage={errors.name?.message}
                                invalid={!!errors.name}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                id="description"
                                label="Descripción"
                                placeholder="Camisas de algodón y texturas variadas..."
                                size="small"
                                rows={4}
                                errorMessage={errors.description?.message}
                                invalid={!!errors.description}
                            />
                        )}
                    />
                </div>
            </Fieldset>

            <div className={styles.actions}>
                <Button
                    type="button"
                    variant="soft"
                    color="neutral"
                    size="small"
                    onClick={() => {
                        if (onCancel) {
                            onCancel();
                        } else {
                            router.back();
                        }
                    }}
                    label="Cancelar"
                    disabled={isSubmitting}
                />
                <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    size="small"
                    label={isSubmitting ? "Guardando..." : (isEditMode ? "Guardar Cambios" : "Crear Categoría")}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
