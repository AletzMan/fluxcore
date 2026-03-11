"use client";

import { Alert, Button, FileUpload, Input, TextArea } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrandSchema, BrandFormValues } from '@/validations/brand.schema';
import { useRouter } from 'next/navigation';
import { createBrandAction, updateBrandAction } from '@/app/actions/brand.actions';
import { useState } from 'react';
import styles from './FormBrand.module.scss';
import { Brand } from '@/typesModels/Brand';

interface FormBrandProps {
    brand?: Brand;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const FormBrand = ({ brand, onSuccess, onCancel }: FormBrandProps) => {
    const isEditMode = !!brand;
    const router = useRouter();
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({
        type: 'idle',
        message: ""
    });

    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<BrandFormValues>({
        resolver: zodResolver(BrandSchema) as any,
        defaultValues: {
            name: brand?.name || "",
            description: brand?.description || ""
        }
    });

    const onSubmit = async (data: BrandFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });

            const formData = new FormData();
            formData.append('name', data.name);
            if (data.description) formData.append('description', data.description);
            if (data.logoFile) formData.append('logoFile', data.logoFile);

            const result = isEditMode && brand
                ? await updateBrandAction(brand.id, formData)
                : await createBrandAction(formData);

            console.log("result", result);

            if (result.success) {
                setStatus({ type: 'success', message: `Marca ${isEditMode ? 'actualizada' : 'creada'} exitosamente. Regresando...` });
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        router.push(`/catalogo/marcas`);
                    }
                    router.refresh();
                }, 1000);
            } else {
                // Mapear errores de campo del servidor al formulario
                if (result.fieldErrors) {
                    for (const [field, fieldMessage] of Object.entries(result.fieldErrors)) {
                        setError(field as keyof BrandFormValues, { type: 'server', message: fieldMessage });
                    }
                }
                setStatus({ type: 'error', message: result.message || "No se pudo guardar la marca." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Error de red al guardar la marca." });
        }
    };

    const onError = () => {
        setStatus({ type: 'error', message: "Por favor revisa los campos en rojo. Hay errores de validación." });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
            {status.type === 'error' && (
                <Alert message="Error al guardar la marca." color="danger" onClose={() => setStatus({ type: 'idle', message: '' })} />
            )}
            {status.type === 'success' && (
                <Alert message={status.message} color="success" />
            )}

            <Fieldset title="Información de la Marca">
                <div className={styles.grid}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="name"
                                label="Nombre de la Marca"
                                placeholder="Ej. Adidas, Nike"
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
                                className={styles.textArea}
                                id="description"
                                label="Descripción"
                                placeholder="Ropa deportiva..."
                                size="small"
                                rows={6}
                                errorMessage={errors.description?.message}
                                invalid={!!errors.description}
                            />
                        )}
                    />

                    <div className={styles.fileInputWrapper}>
                        <Controller
                            name="logoFile"
                            control={control}
                            render={({ field }) => {
                                const { value, onChange, ...rest } = field;
                                let filesArray: File[] = [];
                                if (Array.isArray(value)) filesArray = value;
                                else if (value instanceof FileList) filesArray = Array.from(value);
                                else if (value) filesArray = [value];

                                return (
                                    <FileUpload
                                        {...rest}
                                        id="logoFile"
                                        label="Logo de la Marca (Opcional)"
                                        size="small"
                                        files={filesArray}
                                        onChangeFiles={(files) => {
                                            onChange(files.length > 0 ? files[0] : null);
                                        }}
                                        errorMessage={errors.logoFile?.message as string}
                                        invalid={!!errors.logoFile}
                                    />
                                );
                            }}
                        />
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
                    label={isSubmitting ? "Guardando..." : (isEditMode ? "Guardar Cambios" : "Crear Marca")}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
