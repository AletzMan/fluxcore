"use client";

import { Alert, Button, Input, Select, TextArea, Switch, Divider } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerSchema, UpdateCustomerSchema, CustomerFormValues, UpdateCustomerFormValues } from '@/validations/customer.schema';
import { useRouter } from 'next/navigation';
import { createCustomerAction, updateCustomerAction } from '@/app/actions/customer.actions';
import { useState } from 'react';
import styles from './FormCustomer.module.scss';
import { TaxRegime, CfdiUsage } from '@/enums/common.enums';
import { Customer } from '@/typesModels/Customer';
import { TAX_REGIME_MAP, CFDI_USAGE_MAP, CFDI_USAGE_CODES } from '@/app/constants/customerSections';

// Function to map enums to readable labels
const getTaxRegimeOptions = () => {
    return Object.entries(TaxRegime)
        .filter(([key, value]) => typeof value === 'number')
        .map(([key, value]) => ({
            label: TAX_REGIME_MAP[value as TaxRegime] || key,
            value: value!.toString()
        }));
};

const getCfdiUsageOptions = () => {
    return Object.entries(CfdiUsage)
        .filter(([key, value]) => typeof value === 'number')
        .map(([key, value]) => {
            const val = value as number;
            const code = CFDI_USAGE_CODES[val as keyof typeof CFDI_USAGE_CODES] || key;
            const description = CFDI_USAGE_MAP[val as CfdiUsage] || key;
            return {
                label: `${code} - ${description}`,
                value: val.toString() // We pass the index as string to the Select
            };
        });
};

const getCfdiUsageIndexByCode = (code?: string): CfdiUsage | undefined => {
    if (!code) return undefined;
    const entry = Object.entries(CFDI_USAGE_CODES).find(([_key, val]) => val === code);
    return entry ? Number(entry[0]) as CfdiUsage : undefined;
};

interface FormCustomerProps {
    customer?: Customer;
}

export const FormCustomer = ({ customer }: FormCustomerProps) => {
    const isEditMode = !!customer;
    const router = useRouter();
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({
        type: 'idle',
        message: ""
    });

    const schemaToUse = isEditMode ? UpdateCustomerSchema : CustomerSchema;

    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<UpdateCustomerFormValues>({
        resolver: zodResolver(schemaToUse) as any,
        defaultValues: {
            firstName: customer?.firstName || "",
            lastName: customer?.lastName || "",
            rfc: customer?.rfc || "",
            zipCode: customer?.address || "", // No real zipCode in model! Assuming it from address or fallback empty
            email: customer?.email || "",
            phoneNumber: customer?.phoneNumber || "",
            address: customer?.address || "",
            taxRegime: customer?.taxRegimeCode as TaxRegime,
            cfdiUsage: getCfdiUsageIndexByCode(customer?.cfdiUsageCode),
            isActive: customer ? customer.isActive : true,
        }
    });

    const onSubmit = async (data: UpdateCustomerFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });

            const result = isEditMode && customer
                ? await updateCustomerAction(customer.id, { ...data, address: data.address || "", isActive: data.isActive ?? true })
                : await createCustomerAction({ ...data, address: data.address || "" });

            if (result.success) {
                setStatus({ type: 'success', message: `Cliente ${isEditMode ? 'actualizado' : 'creado'} exitosamente. Regresando...` });
                setTimeout(() => {
                    router.push(`/personas/clientes`);
                    router.refresh();
                }, 1000);
            } else {
                if (result.fieldErrors) {
                    for (const [field, fieldMessage] of Object.entries(result.fieldErrors)) {
                        setError(field as keyof CustomerFormValues, { type: 'server', message: fieldMessage as string });
                    }
                }
                setStatus({ type: 'error', message: result.message || "No se pudo guardar el cliente." });
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Error de red al guardar el cliente." });
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

            <Fieldset title="Información Personal">
                <div className={styles.grid}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="firstName"
                                label="Nombre(s)"
                                placeholder="Ej. Juan"
                                size="small"
                                errorMessage={errors.firstName?.message}
                                invalid={!!errors.firstName}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="lastName"
                                label="Apellidos"
                                placeholder="Ej. Pérez"
                                size="small"
                                errorMessage={errors.lastName?.message}
                                invalid={!!errors.lastName}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="email"
                                type="email"
                                label="Correo Electrónico"
                                placeholder="correo@ejemplo.com"
                                size="small"
                                errorMessage={errors.email?.message}
                                invalid={!!errors.email}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="phoneNumber"
                                label="Teléfono"
                                placeholder="10 dígitos"
                                size="small"
                                errorMessage={errors.phoneNumber?.message}
                                invalid={!!errors.phoneNumber}
                                required
                            />
                        )}
                    />
                </div>
            </Fieldset>

            <Fieldset title="Datos Fiscales">
                <div className={styles.grid}>
                    <Controller
                        name="rfc"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="rfc"
                                label="RFC"
                                placeholder="XAXX010101000"
                                size="small"
                                errorMessage={errors.rfc?.message}
                                invalid={!!errors.rfc}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="zipCode"
                                label="Código Postal"
                                placeholder="00000"
                                size="small"
                                errorMessage={errors.zipCode?.message}
                                invalid={!!errors.zipCode}
                                required
                            />
                        )}
                    />
                    <Controller
                        name="taxRegime"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="taxRegime"
                                label="Régimen Fiscal"
                                placeholder="Selecciona el régimen"
                                size="small"
                                options={getTaxRegimeOptions() as any}
                                errorMessage={errors.taxRegime?.message}
                                invalid={!!errors.taxRegime}
                                onChange={(value) => field.onChange(Number(value))}
                                value={field.value?.toString()}
                            />
                        )}
                    />
                    <Controller
                        name="cfdiUsage"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="cfdiUsage"
                                label="Uso de CFDI"
                                placeholder="Selecciona el uso"
                                size="small"
                                options={getCfdiUsageOptions()}
                                errorMessage={errors.cfdiUsage?.message}
                                invalid={!!errors.cfdiUsage}
                                onChange={(value) => field.onChange(Number(value))}
                                value={field.value?.toString()}
                            />
                        )}
                    />
                    <div className={styles.fullWidth}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    id="address"
                                    label="Dirección Completa"
                                    placeholder="Calle, Número, Colonia, Municipio, Estado"
                                    size="small"
                                    rows={3}
                                    errorMessage={errors.address?.message}
                                    invalid={!!errors.address}
                                />
                            )}
                        />
                    </div>
                </div>
            </Fieldset>

            {isEditMode && customer && (
                <Fieldset title="Estado y Finanzas">
                    <div className={styles.grid}>
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => {
                                const { value, ...rest } = field;
                                return (
                                    <Switch
                                        {...rest}
                                        id="isActive"
                                        label="Cliente Activo en el sistema"
                                        size="small"
                                        checked={value as boolean}
                                        onChange={(e) => field.onChange((e.target as any).checked)}
                                    />
                                );
                            }}
                        />
                        <Input
                            id="currentBalance"
                            label="Saldo Actualizado"
                            size="small"
                            value={`$${(customer.currentBalance || 0).toFixed(2)}`}
                            disabled
                        />
                    </div>
                </Fieldset>
            )}

            <div className={styles.actions}>
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
                    label={isSubmitting ? "Guardando..." : (isEditMode ? "Guardar Cambios" : "Crear Cliente")}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
