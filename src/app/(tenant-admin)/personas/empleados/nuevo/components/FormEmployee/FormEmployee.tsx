"use client";

import { Alert, Button, Input, Select } from 'lambda-ui-components';
import { Fieldset } from '@/app/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmployeeSchema, EmployeeFormValues } from '@/validations/employee.schema';
import { createEmployeeAction } from '@/app/actions/employee.actions';
import styles from './FormEmployee.module.scss';
import { UserRole } from '@/enums/common.enums';

const getUserRoleOptions = () => Object.entries(UserRole)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ label: key.replace(/_/g, ' '), value: value!.toString() }));

export const FormEmployee = () => {
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'danger', message: string }>({ type: 'idle', message: '' });
    const router = useRouter();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<EmployeeFormValues>({
        resolver: zodResolver(EmployeeSchema as any),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            roleId: 0,
            password: '',
        }
    });

    const onSubmit = async (data: EmployeeFormValues) => {
        try {
            setStatus({ type: 'idle', message: '' });

            const result = await createEmployeeAction(data);

            if (result.success) {
                setStatus({ type: 'success', message: `Empleado creado exitosamente. Regresando...` });
                setTimeout(() => {
                    router.push('/personas/empleados');
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

            <Fieldset title="Datos Personales">
                <div className={styles.grid}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="name"
                                label="Nombre Completo"
                                size="small"
                                placeholder="Ej. Ana Gomez"
                                errorMessage={errors.name?.message}
                                invalid={!!errors.name}
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
                                label="Correo Electrónico"
                                size="small"
                                placeholder="correo@empresa.com"
                                errorMessage={errors.email?.message}
                                invalid={!!errors.email}
                            />
                        )}
                    />
                </div>
            </Fieldset>

            <Fieldset title="Cuenta de Acceso">
                <div className={styles.grid}>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="username"
                                label="Nombre de Usuario"
                                size="small"
                                placeholder="anagomez"
                                errorMessage={errors.username?.message}
                                invalid={!!errors.username}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                id="password"
                                type="password"
                                label="Contraseña"
                                size="small"
                                placeholder="Mínimo 6 caracteres"
                                errorMessage={errors.password?.message}
                                invalid={!!errors.password}
                            />
                        )}
                    />
                    <Controller
                        name="roleId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                value={field.value.toString()} // Ensure the value to string
                                id="roleId"
                                label="Rol Asignado"
                                options={getUserRoleOptions()}
                                size="small"
                                errorMessage={errors.roleId?.message}
                                invalid={!!errors.roleId}
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
                    label={isSubmitting ? "Guardando..." : "Crear Empleado"}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
};
