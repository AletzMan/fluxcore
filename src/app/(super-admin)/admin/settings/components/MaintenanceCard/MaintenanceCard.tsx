"use client";

import styles from './MaintenanceCard.module.scss';
import { DashboardCard } from '@/app/components/ui/DashboardCard/DashboardCard';
import { MaintenanceStatus } from '@/typesModels/Settings';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MaintenanceSchema, MaintenanceFormValues } from '@/validations/settings.schema';
import { toggleMaintenanceAction } from '@/app/actions/settings.actions';
import { Alert, Button, TextArea } from 'lambda-ui-components';
import { useState } from 'react';
import { ShieldAlert, ShieldCheck, Clock, User } from 'lucide-react';

interface MaintenanceCardProps {
    data: MaintenanceStatus | null;
}

export function MaintenanceCard({ data }: MaintenanceCardProps) {
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isEnabled = data?.isEnabled ?? false;

    const { control, handleSubmit, formState: { errors } } = useForm<MaintenanceFormValues>({
        resolver: zodResolver(MaintenanceSchema) as any,
        defaultValues: {
            enable: !isEnabled,
            message: data?.message ?? '',
        },
    });

    const onSubmit = async (formData: MaintenanceFormValues) => {
        setIsLoading(true);
        setStatus(null);
        try {
            const response = await toggleMaintenanceAction({
                enable: formData.enable,
                message: formData.message ?? '',
            });

            console.log('response', response);

            if (response?.success === false) {
                setStatus({ type: 'error', message: response.message || 'Error al cambiar el modo de mantenimiento.' });
                return;
            }

            setStatus({ type: 'success', message: formData.enable ? 'Modo de mantenimiento activado.' : 'Modo de mantenimiento desactivado.' });
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch {
            setStatus({ type: 'error', message: 'Ocurrió un error inesperado.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DashboardCard title="Modo de Mantenimiento" description="Activa o desactiva el modo de mantenimiento de la plataforma">
            <div className={styles.maintenance}>
                {/* Estado actual */}
                <div className={`${styles.status_badge} ${isEnabled ? styles.status_badge__active : styles.status_badge__inactive}`}>
                    {isEnabled
                        ? <><ShieldAlert size={18} strokeWidth={1.8} /> Mantenimiento Activo</>
                        : <><ShieldCheck size={18} strokeWidth={1.8} /> Sistema Operativo</>
                    }
                </div>

                {/* Info actual si está activo */}
                {isEnabled && data && (
                    <div className={styles.info}>
                        <div className={styles.info_item}>
                            <Clock size={14} strokeWidth={1.8} />
                            <span>Activado el: <strong>{new Date(data.enabledAt).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}</strong></span>
                        </div>
                        <div className={styles.info_item}>
                            <User size={14} strokeWidth={1.8} />
                            <span>Por: <strong>{data.enabledBy}</strong></span>
                        </div>
                        {data.message && (
                            <div className={styles.info_message}>
                                <span>Mensaje: </span>
                                <p>{data.message}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Alert de estado */}
                {status && (
                    <Alert
                        message={status.message}
                        color={status.type === 'success' ? 'success' : 'danger'}
                        onClose={() => setStatus(null)}
                    />
                )}

                {/* Formulario */}
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                id="maintenance-message"
                                label={isEnabled ? 'Nuevo mensaje (opcional)' : 'Mensaje de mantenimiento (opcional)'}
                                size="small"
                                rows={3}
                                placeholder="Ej. Estamos realizando mejoras en el sistema..."
                                errorMessage={errors.message?.message}
                                invalid={!!errors.message}
                            />
                        )}
                    />
                    <div className={styles.footer}>
                        <Button
                            label={isLoading
                                ? 'Procesando...'
                                : isEnabled
                                    ? 'Desactivar Mantenimiento'
                                    : 'Activar Mantenimiento'
                            }
                            variant="solid"
                            color={isEnabled ? 'success' : 'warning'}
                            size="small"
                            type="submit"
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </div>
        </DashboardCard>
    );
}
