"use client";
import { Checkbox, Input, Radio, RadioGroup, Stepper, Alert, Button, Dialog, Select } from 'lambda-ui-components';
import styles from './FormTenant.module.scss'
import { UserIcon, CheckCircle } from 'lucide-react';
import { Fieldset } from '@/pp/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterTenantSchema, RegisterTenantValues } from '../../../../../../validations/tenant.schema';
import { BillingCycle, PaymentMethod } from '@/enums/common.enums';
import { ErrorMessages } from '@/lib/errors/message-errors';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { createTenantAction } from '@/app/actions/tenant.actions';

interface StepValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

export const FormTenant = () => {
    const [isCreated, setIsCreated] = useState<{ success: boolean, title: string, message: string }>({
        success: false,
        title: "",
        message: ""
    });
    const creationResultRef = useRef<{ success: boolean, title: string, message: string } | null>(null);
    const router = useRouter();

    const { control, handleSubmit, setError, trigger, getValues, watch, formState: { errors } } = useForm<RegisterTenantValues>({
        resolver: zodResolver(RegisterTenantSchema) as any,
        defaultValues: {
            companyName: "",
            taxId: "",
            address: "",
            companyEmail: "",
            phone: "",
            autoRenew: true,
            startTrial: true,
            paymentMethodId: PaymentMethod.CREDIT_CARD.toString(),
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data: RegisterTenantValues) => {
        try {
            const payload = {
                ...data,
                planId: Number(data.planId),
                autoRenew: data.autoRenew === true,
                startTrial: data.startTrial === true,
            };

            const result = await createTenantAction(payload);
            console.log("resultForm", result);
            const newState = {
                success: result.success,
                title: result.success ? "¡Comercio creado con éxito!" : "Error al crear comercio",
                message: result.success
                    ? "El nuevo comercio y el usuario administrador han sido creados correctamente."
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
        switch (stepIndex) {
            case 0:
                // Validar solo los campos del paso 1: Información del comercio
                isValid = await trigger(['companyName', 'taxId', 'address', 'companyEmail', 'phone']);
                errorMessage = isValid ? "" : "Por favor completa todos los campos requeridos correctamente";
                break;
            case 1:
                // Validar solo los campos del paso 2: Plan y suscripción
                isValid = await trigger(['planId', 'billingCycle', 'paymentMethodId', 'autoRenew', 'startTrial']);
                errorMessage = isValid ? "" : "Por favor selecciona un plan, ciclo de facturación y método de pago";
                break;
            case 2:
                // Validar solo los campos del paso 3: Usuario administrador
                //isValid = await trigger(['name', 'username', 'email', 'password', 'confirmPassword']);


                creationResultRef.current = null;
                console.log("Errors", errors)
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

                errorMessage = isValid ? "" : "Por favor completa todos los campos del administrador correctamente";
                break;
            default:
                isValid = false;
                errorMessage = "Paso inválido";
        }

        return {
            isValid,
            errorMessage
        };
    }

    return (
        <div className={styles.formtenant}>
            <Stepper
                defaultActiveStep={0}
                orientation="horizontal"
                variant="bordered"
                onStepValidate={handleStepValidate}
            >
                <Stepper.Step title="Información del comercio" description="Step 1" content={"Step 1"} icon={<UserIcon />} id="step-1" index={0} />
                <Stepper.Step title="Plan y suscripción" description="Step 2" content={"Step 2"} icon={<UserIcon />} id="step-2" index={1} />
                <Stepper.Step title="Usuario administrador" description="Step 3" content={"Step 3"} icon={<UserIcon />} id="step-3" index={2} />
                <Stepper.Content >
                    <div className={styles.formtenant_content}>
                        <form className={styles.formtenant_form}>
                            <Controller
                                name="companyName"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Nombre del comercio"
                                        placeholder="Mercado de la plaza"
                                        type="text"
                                        errorMessage={errors.companyName?.message}
                                        invalid={!!errors.companyName}
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="taxId"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="RFC"
                                        placeholder="12345678A"
                                        type="text"
                                        errorMessage={errors.taxId?.message}
                                        invalid={!!errors.taxId}
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Dirección"
                                        placeholder="Calle Principal, 123"
                                        type="text"
                                        errorMessage={errors.address?.message}
                                        invalid={!!errors.address}
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="companyEmail"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Email del comercio'
                                        placeholder='email@domain.com'
                                        type='email'
                                        errorMessage={errors.companyEmail?.message}
                                        invalid={!!errors.companyEmail}
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Teléfono'
                                        placeholder='123456789'
                                        errorMessage={errors.phone?.message}
                                        invalid={!!errors.phone}
                                        required
                                    />
                                )}
                            />
                        </form>
                    </div>
                </Stepper.Content>
                <Stepper.Content  >
                    <div className={styles.formtenant_content}>
                        <form className={styles.formtenant_form}>
                            <Fieldset title="Plan">
                                <Controller
                                    name="planId"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            {...field}
                                        >
                                            <Radio
                                                label="Free"
                                                value="1"
                                            />
                                            <Radio
                                                label="Basic"
                                                value="2"
                                            />
                                            <Radio
                                                label="Premium"
                                                value="3"
                                            />
                                            <Radio
                                                label="Enterprise"
                                                value="4"
                                            />
                                        </RadioGroup>
                                    )}
                                />
                            </Fieldset>
                            <Fieldset title="Ciclo de facturación">
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
                            </Fieldset>
                            <Fieldset title="Opciones">
                                <Controller
                                    name="paymentMethodId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Método de pago principal"
                                            placeholder="Seleccione un método de pago"
                                            size="small"
                                            errorMessage={errors.paymentMethodId?.message}
                                            invalid={!!errors.paymentMethodId}
                                            options={[
                                                { label: "Tarjeta de Crédito", value: PaymentMethod.CREDIT_CARD },
                                                { label: "Tarjeta de Débito", value: PaymentMethod.DEBIT_CARD },
                                                { label: "Transferencia Bancaria", value: PaymentMethod.TRANSFER },
                                                { label: "Pago Móvil", value: PaymentMethod.MOBILE_PAYMENT },
                                                { label: "Efectivo", value: PaymentMethod.CASH },
                                                { label: "Crédito", value: PaymentMethod.CREDIT },
                                                { label: "Otro", value: PaymentMethod.OTHER }
                                            ]}
                                        />
                                    )}
                                />
                                <Controller
                                    name="startTrial"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            label="Iniciar prueba gratuita"
                                            size="small"
                                            value="true"
                                        />
                                    )}
                                />
                                <Controller
                                    name="autoRenew"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            label="Auto-renovable"
                                            size="small"
                                            value="true"
                                        />
                                    )}
                                />
                            </Fieldset>
                        </form>
                    </div>
                </Stepper.Content>
                <Stepper.Content>
                    <div className={styles.formtenant_content}>
                        {!isCreated.success && isCreated.title &&
                            <Alert
                                className={styles.formtenant_alert}
                                message={isCreated.message}
                                color={isCreated.success ? "success" : "danger"}
                                onClose={() => setIsCreated({ title: "", message: "", success: false })}
                            />}
                        <form className={styles.formtenant_form}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Nombre"
                                        placeholder="Jhon Doe"
                                        errorMessage={errors.name?.message}
                                        invalid={!!errors.name}
                                        type="text"
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Nombre de usuario"
                                        placeholder="jhondoe"
                                        errorMessage={errors.username?.message}
                                        invalid={!!errors.username}
                                        type="text"
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
                                        label='Correo electrónico'
                                        placeholder='email@domain.com'
                                        errorMessage={errors.email?.message}
                                        invalid={!!errors.email}
                                        type='email'
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Contraseña'
                                        placeholder='********'
                                        errorMessage={errors.password?.message}
                                        invalid={!!errors.password}
                                        type='password'
                                        required
                                    />
                                )}
                            />
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label='Confirmar contraseña'
                                        placeholder='********'
                                        errorMessage={errors.confirmPassword?.message}
                                        invalid={!!errors.confirmPassword}
                                        type='password'
                                        required
                                    />
                                )}
                            />
                        </form>
                    </div>
                </Stepper.Content>
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
                                    <h2 className={styles.completed_title}>Comercio Creado Exitosamente</h2>
                                    <p className={styles.completed_subtitle}>{`El comercio ${watch('companyName')} ha sido creado y su suscripción está configurada.`}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.completed_footer}>
                            <Button
                                variant="solid"
                                size="small"
                                label="Agregar Otro Comercio"
                                onClick={() => window.location.reload()}
                                block
                            />
                            <Button
                                variant="solid"
                                size="small"
                                color="neutral"
                                label="Ver Comercios"
                                onClick={() => router.push('/admin/tenants')}
                                block
                            />
                        </div>
                    </div>
                </Stepper.CompletedContent>
            </Stepper>
        </div>
    );
}
