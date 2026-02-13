"use client";
import { Checkbox, Input, Radio, RadioGroup, Stepper } from 'lambda-ui-components';
import styles from './FormTenant.module.scss'
import { UserIcon } from 'lucide-react';
import { Fieldset } from '@/pp/components/layout/Fieldset/Fieldset';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterTenantSchema } from '@/validations/tenant.schema';
import { BillingCycle } from '@/enums/common.enums';
import { ErrorMessages } from '@/lib/errors/message-errors';

interface StepValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

export const FormTenant = () => {
    const { control, handleSubmit, setError, trigger, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterTenantSchema),
    })

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
                isValid = await trigger(['planId', 'billingCycle', 'autoRenew', 'startTrial']);
                errorMessage = isValid ? "" : "Por favor selecciona un plan de suscripción";
                break;
            case 2:
                // Validar solo los campos del paso 3: Usuario administrador
                isValid = await trigger(['name', 'username', 'email', 'password', 'confirmPassword']);

                if (isValid) {
                    const { password, confirmPassword } = getValues();
                    if (password !== confirmPassword) {
                        setError('confirmPassword', {
                            type: 'manual',
                            message: ErrorMessages.TENANT_PASSWORDS_DO_NOT_MATCH,
                        });
                        isValid = false;
                    }
                }

                errorMessage = isValid ? "" : "Por favor completa todos los campos del administrador correctamente";
                break;
            default:
                isValid = false;
                errorMessage = "Paso inválido";
        }

        console.log('Step:', stepIndex, 'isValid:', isValid, 'errors:', errors, 'errorMessage:', errorMessage);

        return {
            isValid,
            errorMessage
        };
    }
    console.log(getValues());
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
            </Stepper>
        </div>
    );
}
