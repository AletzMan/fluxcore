"use client";

import { Alert, Button, Checkbox, DatePicker, Input, InputNumber, Radio, RadioGroup, Stepper, TextArea } from 'lambda-ui-components';
import styles from './FormSubscription.module.scss';
import { Layers, CreditCard, CheckCircle } from 'lucide-react';
import { Fieldset } from '@/pp/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubscriptionSchema, SubscriptionFormValues } from '@/validations/subscription.schema';
import { BillingCycle } from '@/enums/common.enums';
import { useRouter } from 'next/navigation';
import { createSubscriptionAction } from '@/app/actions/subscription.actions';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface StepValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

export const FormSubscription = () => {
    const [isCreated, setIsCreated] = useState<{ success: boolean, title: string, message: string }>({
        success: false,
        title: "",
        message: ""
    });
    const creationResultRef = useRef<{ success: boolean, title: string, message: string } | null>(null);
    const router = useRouter();

    const { control, handleSubmit, trigger, watch, formState: { errors } } = useForm<SubscriptionFormValues>({
        // @ts-ignore
        resolver: zodResolver(SubscriptionSchema),
        defaultValues: {
            tenantId: undefined,
            planId: undefined,
            billingCycle: BillingCycle.MONTHLY,
            startDate: new Date(),
            isTrial: false,
            autoRenew: true,
            notes: ""
        }
    });

    const onSubmit = async (data: SubscriptionFormValues) => {
        try {
            const result = await createSubscriptionAction(data);
            const newState = {
                success: result.success,
                title: result.success ? "¡Suscripción creada con éxito!" : "Error al crear la suscripción",
                message: result.success
                    ? "La suscripción ya está activa."
                    : (result.message || "Verifica que los datos ingresados sean correctos e intenta nuevamente.")
            };

            setIsCreated(newState);
            creationResultRef.current = newState;

        } catch (error) {
            const errorState = {
                success: false,
                title: "Problema de conexión",
                message: "Ocurrió un error inesperado al comunicarse con el servidor. Por favor, intenta de nuevo en unos momentos."
            };
            setIsCreated(errorState);
            creationResultRef.current = errorState;
        }
    };

    const handleStepValidate = async (stepIndex: number): Promise<StepValidationResult> => {
        let isValid = false;
        let errorMessage = "";
        setIsCreated({
            success: false,
            title: "",
            message: ""
        });

        switch (stepIndex) {
            case 0:
                isValid = await trigger(['tenantId', 'planId']);
                errorMessage = isValid ? "" : "Complete los IDs del comercio y plan.";
                break;
            case 1:
                // Limpiar el ref antes de intentar enviar por si es el último paso
                creationResultRef.current = null;
                // @ts-ignore
                await handleSubmit(onSubmit)();

                const result = creationResultRef.current as { success: boolean, title: string, message: string } | null;

                if (result && result.success === false) {
                    isValid = false;
                    errorMessage = result.title;
                    break;
                }

                if (!result) {
                    isValid = false;
                    break;
                }

                isValid = true;
                break;
            default:
                isValid = false;
        }

        return { isValid, errorMessage };
    };

    return (
        <div className={styles.formsubscription}>
            <Stepper
                defaultActiveStep={0}
                orientation="horizontal"
                variant="bordered"
                onStepValidate={handleStepValidate}
            >
                <Stepper.Step title="Configuración" description="Asignación básica" content="Configuración" icon={<Layers size={20} />} id="step-1" index={0} />
                <Stepper.Step title="Fechas & Opciones" description="Facturación y ciclo" content="Opciones" icon={<CreditCard size={20} />} id="step-2" index={1} />

                {/* Paso 1: Configuración */}
                <Stepper.Content>
                    <div key="step-1-content" className={styles.formsubscription_content}>
                        <form className={styles.formsubscription_form}>
                            <Fieldset title="Asignación al Comercio">
                                <Controller
                                    name="tenantId"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            id={field.name}
                                            size="small"
                                            label="Tenant ID"
                                            onChangeValue={(value) => field.onChange(value)}
                                            min={1}
                                            errorMessage={errors.tenantId?.message}
                                            invalid={!!errors.tenantId}
                                            required
                                            placeholder='123'
                                        />
                                    )}
                                />
                                <Controller
                                    name="planId"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            id={field.name}
                                            size="small"
                                            label="Plan ID"
                                            onChangeValue={(value) => field.onChange(value)}
                                            min={1}
                                            errorMessage={errors.planId?.message}
                                            invalid={!!errors.planId}
                                            required
                                            placeholder='1'
                                        />
                                    )}
                                />
                            </Fieldset>
                        </form>
                    </div>
                </Stepper.Content>

                {/* Paso 2: Opciones */}
                <Stepper.Content>
                    <div key="step-2-content" className={styles.formsubscription_content}>
                        {!isCreated.success && isCreated.title &&
                            <Alert
                                className={styles.formsubscription_alert}
                                message={isCreated.message}
                                color={isCreated.success ? "success" : "danger"}
                                onClose={() => setIsCreated({ title: "", message: "", success: false })}
                            />
                        }
                        <form className={styles.formsubscription_form}>
                            <Fieldset title="Ciclo Operativo">
                                <Controller
                                    name="billingCycle"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            orientation="horizontal"
                                            {...field}
                                        >
                                            <Radio
                                                label="Mensual"
                                                value={BillingCycle.MONTHLY.toString()}
                                            />
                                            <Radio
                                                label="Trimestral"
                                                value={BillingCycle.QUARTERLY.toString()}
                                            />
                                            <Radio
                                                label="Semestral"
                                                value={BillingCycle.SEMIANNUAL.toString()}
                                            />
                                            <Radio
                                                label="Anual"
                                                value={BillingCycle.ANNUAL.toString()}
                                            />
                                        </RadioGroup>
                                    )}
                                />
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            id={field.name}
                                            size="small"
                                            label="Fecha de inicio"
                                            value={field.value ? new Date(field.value) : undefined}
                                            onChange={(value) => field.onChange(value)}
                                            errorMessage={errors.startDate?.message}
                                            invalid={!!errors.startDate}
                                        />
                                    )}
                                />
                            </Fieldset>
                            <Fieldset title="Opciones (Auto, Trial, Pagos)">
                                <Controller
                                    name="isTrial"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Es período de prueba (Trial)"
                                        />
                                    )}
                                />
                                <Controller
                                    name="autoRenew"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Auto-renovación"
                                        />
                                    )}
                                />
                                <Controller
                                    name="notes"
                                    control={control}
                                    render={({ field }) => (
                                        <TextArea
                                            {...field}
                                            id={field.name}
                                            label="Notas (Opcional)"
                                            size="small"
                                            rows={2}
                                            placeholder="Detalles de la asignación..."
                                        />
                                    )}
                                />
                            </Fieldset>
                        </form>
                    </div>
                </Stepper.Content>

                {/* Finalización */}
                <Stepper.CompletedContent>
                    <div className={styles.completed}>
                        <div className={styles.completed_content}>
                            <div className={styles.completed_header}>
                                <motion.div
                                    key="completed-success-icon"
                                    className={styles.completed_icon_wrapper}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        repeatDelay: 2
                                    }}
                                >
                                    <CheckCircle className={styles.completed_icon} />
                                </motion.div>
                                <div className={styles.completed_text}>
                                    <h2 className={styles.completed_title}>Suscripción Asignada</h2>
                                    <p className={styles.completed_subtitle}>{`El comercio ID. ${watch('tenantId')} ha sido asignado al Plan ID. ${watch('planId')}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.completed_footer}>
                            <Button
                                variant="solid"
                                size="small"
                                label="Asignar Nueva Suscripción"
                                onClick={() => window.location.reload()}
                                block
                            />
                            <Button
                                variant="solid"
                                size="small"
                                color="neutral"
                                label="Ver Suscripciones"
                                onClick={() => router.push('/admin/subscriptions')}
                                block
                            />
                        </div>
                    </div>
                </Stepper.CompletedContent>
            </Stepper>
        </div>
    );
};
