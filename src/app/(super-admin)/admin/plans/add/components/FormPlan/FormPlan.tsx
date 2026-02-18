
"use client";

import { Alert, Button, Checkbox, Dialog, Divider, Input, InputNumber, Stepper, Tag, TextArea } from 'lambda-ui-components';
import styles from './FormPlan.module.scss'
import { Fieldset } from '@/pp/components/layout/Fieldset/Fieldset';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlanSchema, PlanFormValues } from '@/validations/plan.schema';
import { Package, CreditCard, Layers, ShieldCheck, Trash2, CheckCircle } from 'lucide-react';
import { planService } from '@/app/services/api/plan.service';
import { useRouter } from 'next/navigation';
import { createPlanAction } from '@/app/actions/plan.actions';
import { PlanCard } from '@/app/components/ui/PlanCard/PlanCard';
import { useState } from 'react';
import { motion } from 'motion/react';

interface StepValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

// @ts-ignore
export const FormPlan = (props: any) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [isCreated, setIsCreated] = useState<{ success: boolean, title: string, message: string }>({
        success: false,
        title: "",
        message: ""
    });
    const router = useRouter();

    const { control, handleSubmit, trigger, watch, formState: { errors } } = useForm<PlanFormValues>({
        resolver: zodResolver(PlanSchema),
        defaultValues: {
            name: "",
            description: "",
            hasInventoryManagement: false,
            hasSalesReports: false,
            hasAdvancedReports: false,
            hasMultiCurrency: false,
            hasApiAccess: false,
            hasPrioritySupport: false,
            monthlyPrice: 1,
            quarterlyPrice: 1,
            semiannualPrice: 1,
            annualPrice: 1,
            trialDays: 7,
            maxUsers: 1,
            maxProducts: 50,
            maxBranches: 1,
            features: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "features"
    });

    const onSubmit = async (data: PlanFormValues) => {
        try {
            const result = await createPlanAction({
                ...data,
            });
            if (result.success) {
                setIsCreated({
                    success: true,
                    title: "¡Plan creado con éxito!",
                    message: "El nuevo plan de suscripción ya está activo y listo para ser asignado a los comercios."
                });
            } else {
                setIsCreated({
                    success: false,
                    title: "Error al crear el plan",
                    message: result.message || "Verifica que los datos ingresados sean correctos e intenta nuevamente."
                });
            }
        } catch (error) {
            setIsCreated({
                success: false,
                title: "Problema de conexión",
                message: "Ocurrió un error inesperado al comunicarse con el servidor. Por favor, intenta de nuevo en unos momentos."
            });
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
                isValid = await trigger(['name', 'description']);
                errorMessage = isValid ? "" : "Complete correctamente el nombre y descripción.";
                break;
            case 1:
                isValid = await trigger(['monthlyPrice', 'quarterlyPrice', 'semiannualPrice', 'annualPrice', 'trialDays']);
                errorMessage = isValid ? "" : "Revise los precios y días de prueba.";
                break;
            case 2:
                isValid = await trigger(['maxUsers', 'maxProducts', 'maxBranches']);
                errorMessage = isValid ? "" : "Revise los límites del plan.";
                break;
            case 3:
                await handleSubmit(onSubmit)();
                if (isCreated.success) {
                    isValid = false;
                    errorMessage = isCreated.title;
                    break;
                }
                isValid = true;
                break;
            default:
                isValid = false;
        }

        // Si es el último paso y es válido, enviar el formulario
        if (stepIndex === 3 && isValid) {
            //await handleSubmit(onSubmit)();
        }

        return { isValid, errorMessage };
    }


    return (
        <div className={styles.formplan}>
            <Stepper
                defaultActiveStep={0}
                orientation="horizontal"
                variant="bordered"
                onStepValidate={handleStepValidate}
            >
                <Stepper.Step title="Detalles Básicos" description="Nombre y desc." content="Detalles Básicos" icon={<Package size={20} />} id="step-1" index={0} />
                <Stepper.Step title="Precios" description="Costos del plan" content="Precios" icon={<CreditCard size={20} />} id="step-2" index={1} />
                <Stepper.Step title="Límites" description="Restricciones" content="Límites" icon={<Layers size={20} />} id="step-3" index={2} />
                <Stepper.Step title="Funcionalidades" description="Características" content="Funcionalidades" icon={<ShieldCheck size={20} />} id="step-4" index={3} />

                {/* Paso 1: Detalles Básicos */}
                <Stepper.Content>
                    <div key="step-1-content" className={styles.formplan_content}>
                        <form className={styles.formplan_form}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id={field.name}
                                        size="small"
                                        label="Nombre del Plan"
                                        placeholder="Ej. Plan Empresarial"
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
                                        className={styles.formplan_description}
                                        id={field.name}
                                        label="Descripción"
                                        size="small"
                                        rows={4}
                                        placeholder="Breve descripción de los beneficios..."
                                        errorMessage={errors.description?.message}
                                        invalid={!!errors.description}
                                        required
                                    />
                                )}
                            />
                        </form>
                    </div>
                </Stepper.Content>

                {/* Paso 2: Precios */}
                <Stepper.Content>
                    <div key="step-2-content" className={styles.formplan_content}>
                        <form className={styles.formplan_form}>
                            <div className={styles.formplan_grid}>
                                <Controller
                                    name="monthlyPrice"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            id={field.name}
                                            size="small"
                                            label="Precio Mensual"
                                            onChangeValue={(value) => field.onChange(value)}
                                            min={0}
                                            errorMessage={errors.monthlyPrice?.message}
                                            invalid={!!errors.monthlyPrice}
                                            required
                                        />
                                    )}
                                />
                                <Controller
                                    name="quarterlyPrice"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            id={field.name}
                                            size="small"
                                            label="Precio Trimestral"
                                            onChangeValue={(value) => field.onChange(value)}
                                            min={0}
                                            errorMessage={errors.quarterlyPrice?.message}
                                            invalid={!!errors.quarterlyPrice}
                                            required
                                        />
                                    )}
                                />
                                <Controller
                                    name="semiannualPrice"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            id={field.name}
                                            size="small"
                                            label="Precio Semestral"
                                            onChangeValue={(value) => field.onChange(value)}
                                            min={0}
                                            errorMessage={errors.semiannualPrice?.message}
                                            invalid={!!errors.semiannualPrice}
                                            required
                                        />
                                    )}
                                />
                                <Controller
                                    name="annualPrice"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            id={field.name}
                                            size="small"
                                            label="Precio Anual"
                                            onChangeValue={(value) => field.onChange(value)}
                                            min={0}
                                            errorMessage={errors.annualPrice?.message}
                                            invalid={!!errors.annualPrice}
                                            required
                                        />
                                    )}
                                />
                            </div>
                            <Controller
                                name="trialDays"
                                control={control}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        id={field.name}
                                        size="small"
                                        label="Días de Prueba Gratuita"
                                        onChangeValue={(value) => field.onChange(value)}
                                        min={0}
                                        errorMessage={errors.trialDays?.message}
                                        invalid={!!errors.trialDays}
                                        required
                                    />
                                )}
                            />
                        </form>
                    </div>
                </Stepper.Content>

                {/* Paso 3: Límites */}
                <Stepper.Content>
                    <div key="step-3-content" className={styles.formplan_content}>
                        <form className={styles.formplan_form}>
                            <Controller
                                name="maxUsers"
                                control={control}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        id={field.name}
                                        size="small"
                                        label="Máximo de Usuarios"
                                        onChangeValue={(value) => field.onChange(value)}
                                        min={1}
                                        errorMessage={errors.maxUsers?.message}
                                        invalid={!!errors.maxUsers}
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="maxProducts"
                                control={control}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        id={field.name}
                                        size="small"
                                        label="Máximo de Productos"
                                        onChangeValue={(value) => field.onChange(value)}
                                        min={1}
                                        errorMessage={errors.maxProducts?.message}
                                        invalid={!!errors.maxProducts}
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="maxBranches"
                                control={control}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        id={field.name}
                                        size="small"
                                        label="Máximo de Sucursales"
                                        onChangeValue={(value) => field.onChange(value)}
                                        min={1}
                                        errorMessage={errors.maxBranches?.message}
                                        invalid={!!errors.maxBranches}
                                        required
                                    />
                                )}
                            />
                        </form>
                    </div>
                </Stepper.Content>

                {/* Paso 4: Funcionalidades */}
                <Stepper.Content>
                    <div key="step-4-content" className={styles.formplan_content}>
                        {!isCreated.success && isCreated.title &&
                            <Alert
                                className={styles.formplan_alert}
                                message={isCreated.message}
                                color={isCreated.success ? "success" : "danger"}
                                onClose={() => setIsCreated({ title: "", message: "", success: false })}
                            />}
                        <form className={styles.formplan_form}>
                            <Fieldset title="Módulos Incluidos">
                                <Controller
                                    name="hasInventoryManagement"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Gestión de Inventario"
                                        />
                                    )}
                                />
                                <Controller
                                    name="hasSalesReports"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Reportes de Ventas Básicos"
                                        />
                                    )}
                                />
                                <Controller
                                    name="hasAdvancedReports"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Reportes Avanzados"
                                        />
                                    )}
                                />
                                <Controller
                                    name="hasMultiCurrency"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Multi-Moneda"
                                        />
                                    )}
                                />
                                <Controller
                                    name="hasApiAccess"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Acceso a API"
                                        />
                                    )}
                                />
                                <Controller
                                    name="hasPrioritySupport"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id={field.name}
                                            size="small"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            label="Soporte Prioritario"
                                        />
                                    )}
                                />
                            </Fieldset>
                            <Fieldset title="Características Adicionales">
                                {/*Array de features */}
                                {fields.map((feature, index) => (
                                    <div className={styles.formplan_features} key={feature.id}>
                                        {index > 0 && <Divider contentPosition="end" variant='dashed' />}
                                        <div className={styles.formplan_line}>
                                            <Controller
                                                name={`features.${index}.name`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        id={field.name}
                                                        label="Nombre"
                                                        size="small"
                                                        value={field.value}
                                                        onChangeValue={(value) => field.onChange(value)}
                                                        errorMessage={errors.features?.[index]?.name?.message}
                                                        invalid={!!errors.features?.[index]?.name}
                                                        required
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name={`features.${index}.description`}
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        id={field.name}
                                                        label="Descripción"
                                                        size="small"
                                                        value={field.value}
                                                        onChangeValue={(value) => field.onChange(value)}
                                                        errorMessage={errors.features?.[index]?.description?.message}
                                                        invalid={!!errors.features?.[index]?.description}
                                                        required
                                                    />
                                                )}
                                            />
                                            <Button
                                                variant="soft"
                                                color="danger"
                                                size="tiny"
                                                icon={<Trash2 size={16} />}
                                                onClick={() => remove(index)} />
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="small"
                                    label="Agregar Característica"
                                    onClick={() => append({ name: "", description: "", isEnabled: true, displayOrder: fields.length + 1 })} />
                            </Fieldset>
                        </form>
                    </div>
                </Stepper.Content>

                {/*Contenido de finalización*/}
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
                                    <h2 className={styles.completed_title}>Plan Creado Exitosamente</h2>
                                    <p className={styles.completed_subtitle}>{`El plan ${watch('name')} ha sido creado exitosamente y ya se encuentra disponible para suscripciones.`}</p>
                                </div>
                                <Button variant="soft" color="secondary" size="small" label="Ver Tarjeta del Plan" onClick={() => setIsOpenDialog(true)} />
                            </div>
                            <Dialog isOpen={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
                                <div className={styles.completed_preview}>
                                    <PlanCard plan={watch()} />
                                </div>
                            </Dialog>
                        </div>
                        <div className={styles.completed_footer}>
                            <Button
                                variant="solid"
                                size="small"
                                label="Agregar Otro Plan"
                                onClick={() => window.location.reload()}
                                block
                            />
                            <Button
                                variant="solid"
                                size="small"
                                color="neutral"
                                label="Ver Planes"
                                onClick={() => router.push('/admin/plans')}
                                block
                            />
                        </div>
                    </div>
                </Stepper.CompletedContent>
            </Stepper>
        </div>
    );
}
