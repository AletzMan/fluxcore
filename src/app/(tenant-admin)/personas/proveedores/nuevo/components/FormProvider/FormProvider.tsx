"use client";

import { Alert, Button, Input, TextArea } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProviderSchema, ProviderFormValues } from '@/validations/provider.schema';
import { createProviderAction } from '@/app/actions/provider.actions';
import styles from './FormProvider.module.scss';
import { Provider } from '@/typesModels/Provider';

export const FormProvider = () => {
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'danger', message: string }>({ type: 'idle', message: '' });
    const router = useRouter();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ProviderFormValues>({
        resolver: zodResolver(ProviderSchema as any),
        defaultValues: {
            companyName: '',
            rfc: '',
            contactName: '',
            contactEmail: '',
            contactPhone: '',
            address: '',
        }
    });

    const onSubmit = async (data: ProviderFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });

            const result = await createProviderAction({ ...data, address: data.address || "" });

            if (result.success) {
                setStatus({ type: 'success', message: `Proveedor creado exitosamente. Regresando...` });
                setTimeout(() => {
                    router.push('/personas/proveedores');
                }, 1000);
            } else {
                if (result.fieldErrors) {
                    for (const [field, fieldMessage] of Object.entries(result.fieldErrors)) {
                        setError(field as any, { type: 'server', message: fieldMessage as string });
                    }
                }
                setStatus({ type: 'danger', message: result.message || 'Error al procesar la solicitud' });
            }
        } catch (error) {
            setStatus({ type: 'danger', message: 'Ocurrió un error inesperado al enviar el formulario' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {status.type !== 'idle' && (
                <Alert
                    color={status.type}
                    message={status.message}
                    onClose={() => setStatus({ type: 'idle', message: '' })}
                />
            )}

            <Fieldset title="Información General">
                <div className={styles.grid}>
                    <Controller
                        name="companyName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="companyName"
                                label="Nombre de la Empresa"
                                size="small"
                                placeholder="Ej. Computadoras S.A. de C.V."
                                errorMessage={errors.companyName?.message}
                                invalid={!!errors.companyName}
                            />
                        )}
                    />
                    <Controller
                        name="rfc"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="rfc"
                                label="RFC"
                                size="small"
                                placeholder="XEXX010101000"
                                errorMessage={errors.rfc?.message}
                                invalid={!!errors.rfc}
                            />
                        )}
                    />
                </div>
            </Fieldset>

            <Fieldset title="Contacto Príncipal">
                <div className={styles.grid}>
                    <Controller
                        name="contactName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="contactName"
                                label="Nombre del Contacto"
                                size="small"
                                placeholder="Ej. Juan Pérez"
                                errorMessage={errors.contactName?.message}
                                invalid={!!errors.contactName}
                            />
                        )}
                    />
                    <Controller
                        name="contactEmail"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="contactEmail"
                                label="Correo Electrónico"
                                size="small"
                                placeholder="correo@empresa.com"
                                errorMessage={errors.contactEmail?.message}
                                invalid={!!errors.contactEmail}
                            />
                        )}
                    />
                    <Controller
                        name="contactPhone"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="contactPhone"
                                label="Teléfono"
                                size="small"
                                placeholder="5500000000"
                                errorMessage={errors.contactPhone?.message}
                                invalid={!!errors.contactPhone}
                            />
                        )}
                    />
                </div>
            </Fieldset>

            <Fieldset title="Domicilio">
                <div className={styles.grid}>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                id="address"
                                label="Dirección Completa"
                                size="small"
                                placeholder="Calle, Número exterior, Colonia..."
                                errorMessage={errors.address?.message}
                                invalid={!!errors.address}
                                rows={3}
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
                    label="Cancelar"
                    disabled={isSubmitting}
                    onClick={() => router.back()}
                />
                <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    size="small"
                    label={isSubmitting ? "Guardando..." : "Crear Proveedor"}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
