"use client";

import { Alert, Button, Input, InputNumber } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductVariantSchema, ProductVariantFormValues } from '@/validations/product-variant.schema';
import { useRouter } from 'next/navigation';
import { createProductVariantAction, updateProductVariantAction } from '@/app/actions/product-variant.actions';
import { useState } from 'react';
import { Layers } from 'lucide-react';
import styles from './FormProductVariant.module.scss';
import { ProductVariant } from '@/typesModels/ProductVariant';

interface FormProductVariantProps {
    productMasterId: number;
    variant?: ProductVariant;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const FormProductVariant = ({ productMasterId, variant, onSuccess, onCancel }: FormProductVariantProps) => {
    const isEditMode = !!variant;
    const router = useRouter();
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({
        type: 'idle',
        message: ""
    });

    // Para controlar el archivo en estado local
    const [file, setFile] = useState<File | null>(null);

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProductVariantFormValues>({
        resolver: zodResolver(ProductVariantSchema) as any,
        defaultValues: {
            barcode: variant?.barcode || "",
            price: variant?.price || 0,
            minStock: variant?.minStock || 0,
            productMasterId: productMasterId
        }
    });

    const onSubmit = async (data: ProductVariantFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });

            const formData = new FormData();
            formData.append('barcode', data.barcode);
            formData.append('price', data.price.toString());
            formData.append('minStock', data.minStock.toString());
            formData.append('productMasterId', data.productMasterId.toString());
            if (file) {
                formData.append('imageFile', file);
            }

            const result = isEditMode && variant
                ? await updateProductVariantAction(variant.id, formData)
                : await createProductVariantAction(formData);

            if (result.success) {
                setStatus({ type: 'success', message: `Variante ${isEditMode ? 'actualizada' : 'añadida'} exitosamente. Regresando a la ficha del producto...` });
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        router.push(`/catalogo/productos/${productMasterId}`);
                    }
                    router.refresh(); // Para refrescar la tabla del detalle
                }, 1000);
            } else {
                setStatus({ type: 'error', message: result.message || "No se pudo guardar la variante." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Error de red al guardar." });
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

            <Fieldset title="Detalles Físicos y Precio">
                <div className={styles.gridSingle}>
                    <div className={styles.gridMulti}>
                        <Controller
                            name="barcode"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="barcode"
                                    label="Código de Barras / SKU"
                                    placeholder="Ej. T-SHIRT-M-RED"
                                    size="small"
                                    errorMessage={errors.barcode?.message}
                                    invalid={!!errors.barcode}
                                    required
                                />
                            )}
                        />

                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    id="price"
                                    label="Precio Público"
                                    size="small"
                                    min={0}
                                    onChangeValue={(val) => field.onChange(val)}
                                    errorMessage={errors.price?.message}
                                    invalid={!!errors.price}
                                    required
                                />
                            )}
                        />
                    </div>

                    <div className={styles.gridMulti}>
                        <Controller
                            name="minStock"
                            control={control}
                            render={({ field }) => (
                                <InputNumber
                                    {...field}
                                    id="minStock"
                                    label="Stock Mínimo Permitido"
                                    size="small"
                                    min={0}
                                    onChangeValue={(val) => field.onChange(val)}
                                    errorMessage={errors.minStock?.message}
                                    invalid={!!errors.minStock}
                                    required
                                />
                            )}
                        />

                        <div className={styles.fileInputWrapper}>
                            <label className={styles.fileLabel}>Imagen de la Variante (Opcional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className={styles.fileInput}
                            />
                        </div>
                    </div>

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
                    label={isSubmitting ? "Guardando..." : (isEditMode ? "Guardar Cambios" : "Agregar Variante")}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
