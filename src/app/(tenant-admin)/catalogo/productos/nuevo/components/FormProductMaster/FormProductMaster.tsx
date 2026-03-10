"use client";

import { Alert, Button, Input, InputNumber, TextArea } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductMasterSchema, ProductMasterFormValues } from '@/validations/product-master.schema';
import { useRouter } from 'next/navigation';
import { createProductMasterAction } from '@/app/actions/product-master.actions';
import { useState } from 'react';
import { Package } from 'lucide-react';

export const FormProductMaster = () => {
    const router = useRouter();
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({
        type: 'idle',
        message: ""
    });

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductMasterFormValues>({
        resolver: zodResolver(ProductMasterSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            categoryId: 1, // Default por ahora
            brandId: 1     // Default por ahora
        }
    });

    const onSubmit = async (data: ProductMasterFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });
            const result = await createProductMasterAction({
                ...data,
                description: data.description || ""
            });

            if (result.success && result.data?.id) {
                setStatus({ type: 'success', message: "Producto guardado con éxito. Redirigiendo..." });
                setTimeout(() => {
                    router.push(`/catalogo/productos/${result.data?.id}`);
                }, 1000);
            } else {
                setStatus({ type: 'error', message: result.message || "No se pudo guardar el producto." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Error de red al guardar el producto." });
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

            <Fieldset title="Información Principal">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-md)' }}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="name"
                                label="Nombre del Producto"
                                placeholder="Ej. Playera Polo Básica"
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
                                placeholder="Especificaciones generales..."
                                size="small"
                                rows={3}
                                errorMessage={errors.description?.message}
                                invalid={!!errors.description}
                                required
                            />
                        )}
                    />
                </div>
            </Fieldset>

            <Fieldset title="Clasificación">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                    {/* Nota: En el futuro estos deberían ser "Select" conectados al Endpoint de Categorias/Marcas respectivo */}
                    <Controller
                        name="categoryId"
                        control={control}
                        render={({ field }) => (
                            <InputNumber
                                {...field}
                                id="categoryId"
                                label="ID Categoría"
                                size="small"
                                min={1}
                                onChangeValue={(val) => field.onChange(val)}
                                errorMessage={errors.categoryId?.message}
                                invalid={!!errors.categoryId}
                                required
                            />
                        )}
                    />

                    <Controller
                        name="brandId"
                        control={control}
                        render={({ field }) => (
                            <InputNumber
                                {...field}
                                id="brandId"
                                label="ID Marca"
                                size="small"
                                min={1}
                                onChangeValue={(val) => field.onChange(val)}
                                errorMessage={errors.brandId?.message}
                                invalid={!!errors.brandId}
                                required
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
                    label={isSubmitting ? "Guardando..." : "Crear Producto Maestro"}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
