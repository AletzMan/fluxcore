"use client";

import { Alert, Button, Input, TextArea } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategorySchema, CategoryFormValues } from '@/validations/category.schema';
import { useRouter } from 'next/navigation';
import { createCategoryAction } from '@/app/actions/category.actions';
import { useState } from 'react';

export const FormCategory = () => {
    const router = useRouter();
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({
        type: 'idle',
        message: ""
    });

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<CategoryFormValues>({
        resolver: zodResolver(CategorySchema) as any,
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });
            const result = await createCategoryAction({
                name: data.name,
                description: data.description || undefined
            });

            if (result.success) {
                setStatus({ type: 'success', message: "Categoría creada exitosamente. Regresando..." });
                setTimeout(() => {
                    router.push(`/catalogo/categorias`);
                    router.refresh();
                }, 1000);
            } else {
                setStatus({ type: 'error', message: result.message || "No se pudo guardar la categoría." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Error de red al guardar la categoría." });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            {status.type === 'error' && (
                <Alert message={status.message} color="danger" onClose={() => setStatus({ type: 'idle', message: '' })} />
            )}
            {status.type === 'success' && (
                <Alert message={status.message} color="success" />
            )}

            <Fieldset title="Información de la Categoría">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-md)' }}>
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

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
                <Button
                    type="button"
                    variant="soft"
                    color="neutral"
                    size="small"
                    onClick={() => router.back()}
                    label="Cancelar"
                    disabled={isSubmitting}
                />
                <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    size="small"
                    label={isSubmitting ? "Guardando..." : "Crear Categoría"}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
