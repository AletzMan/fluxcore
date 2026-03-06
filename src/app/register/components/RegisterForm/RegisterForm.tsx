import { Checkbox, Input, Select, Button, Alert } from "lambda-ui-components";
import { UserIcon, Building, CreditCard, CheckCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterTenantSchema, RegisterTenantValues } from "@/validations/tenant.schema";
import { BillingCycle, PaymentMethod } from "@/enums/common.enums";
import { createTenantAction } from "@/app/actions/tenant.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plan } from "@/typesModels/Plan";
import styles from "./RegisterForm.module.scss";

interface RegisterFormProps {
    selectedPlan: Plan;
    billingCycle: string;
}

export function RegisterForm({ selectedPlan, billingCycle }: RegisterFormProps) {
    const defaultBillingCycle = billingCycle === 'yearly' ? BillingCycle.ANNUAL : BillingCycle.MONTHLY;
    const router = useRouter();

    const [submissionState, setSubmissionState] = useState<{
        isLoading: boolean;
        success: boolean;
        message: string;
    }>({
        isLoading: false,
        success: false,
        message: ""
    });

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterTenantValues>({
        resolver: zodResolver(RegisterTenantSchema) as any,
        defaultValues: {
            planId: selectedPlan.id,
            billingCycle: defaultBillingCycle, // mapping from string to enum
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
    });

    const onSubmit = async (data: RegisterTenantValues) => {
        setSubmissionState({ isLoading: true, success: false, message: "" });
        try {
            const payload = {
                ...data,
                planId: Number(data.planId),
                autoRenew: data.autoRenew === true,
                startTrial: data.startTrial === true,
            };

            // ! IMPORTANTE C# !
            // Esta accion fallará con un 401 Unauthorized si en C# (TenantsController.cs)
            // el metodo POST (o uno nuevo publico) no tiene el atributo [AllowAnonymous]
            const result = await createTenantAction(payload);

            if (result.success) {
                setSubmissionState({
                    isLoading: false,
                    success: true,
                    message: "¡Cuenta creada exitosamente! Redirigiendo al login..."
                });
                // Podríamos omitir aquí hacer auth automático, y enviarlo a login
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setSubmissionState({
                    isLoading: false,
                    success: false,
                    message: result.message || "Error al registrar la información. (Si ves 401, falta AllowAnonymous en el backend)."
                });
            }
        } catch (error: any) {
            setSubmissionState({
                isLoading: false,
                success: false,
                message: "Ocurrió un error inesperado al comunicarse con el servidor."
            });
        }
    };

    if (submissionState.success) {
        return (
            <div className={styles.successState}>
                <CheckCircle size={64} className={styles.successIcon} />
                <h2>¡Registro Exitoso!</h2>
                <p>Tu Tenant y cuenta de Administrador han sido creados.</p>
                <p>Te estamos redirigiendo para que inicies sesión...</p>
            </div>
        );
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
            {submissionState.message && !submissionState.success && (
                <Alert
                    message={submissionState.message}
                    color="danger"
                    onClose={() => setSubmissionState({ ...submissionState, message: "" })}
                />
            )}

            <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                    <UserIcon />
                    <h3>1. Tus Datos (Usuario Administrador)</h3>
                </div>
                <div className={styles.grid2}>
                    <Controller name="name" control={control} render={({ field }) => (
                        <Input {...field} label="Nombre Completo" placeholder="Ej. Juan Pérez" errorMessage={errors.name?.message} invalid={!!errors.name} required />
                    )} />
                    <Controller name="username" control={control} render={({ field }) => (
                        <Input {...field} label="Nombre de Usuario (Login)" placeholder="Sera usado para tu inicio de sesión" errorMessage={errors.username?.message} invalid={!!errors.username} required />
                    )} />
                    <Controller name="email" control={control} render={({ field }) => (
                        <Input {...field} label="Email Personal" type="email" placeholder="juan@gmail.com" errorMessage={errors.email?.message} invalid={!!errors.email} required />
                    )} />
                    <Controller name="password" control={control} render={({ field }) => (
                        <Input {...field} label="Contraseña" type="password" placeholder="********" errorMessage={errors.password?.message} invalid={!!errors.password} required />
                    )} />
                    <Controller name="confirmPassword" control={control} render={({ field }) => (
                        <Input {...field} label="Confirmar Contraseña" type="password" placeholder="********" errorMessage={errors.confirmPassword?.message} invalid={!!errors.confirmPassword} required />
                    )} />
                </div>
            </div>

            <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                    <Building />
                    <h3>2. Datos de tu Negocio (Tenant)</h3>
                </div>
                <div className={styles.grid2}>
                    <Controller name="companyName" control={control} render={({ field }) => (
                        <Input {...field} label="Nombre del Negocio" placeholder="Ej. Abarrotes Los Patos" errorMessage={errors.companyName?.message} invalid={!!errors.companyName} required />
                    )} />
                    <Controller name="taxId" control={control} render={({ field }) => (
                        <Input {...field} label="RFC o Identificación Fiscal" placeholder="XAXX010101000" errorMessage={errors.taxId?.message} invalid={!!errors.taxId} required />
                    )} />
                    <Controller name="companyEmail" control={control} render={({ field }) => (
                        <Input {...field} label="Email del Negocio" type="email" placeholder="contacto@negocio.com" errorMessage={errors.companyEmail?.message} invalid={!!errors.companyEmail} required />
                    )} />
                    <Controller name="phone" control={control} render={({ field }) => (
                        <Input {...field} label="Teléfono de Contacto" placeholder="10 dígitos" errorMessage={errors.phone?.message} invalid={!!errors.phone} required />
                    )} />
                    <div style={{ gridColumn: "1 / -1" }}>
                        <Controller name="address" control={control} render={({ field }) => (
                            <Input {...field} label="Dirección Principal" placeholder="Av siempre viva 123" errorMessage={errors.address?.message} invalid={!!errors.address} required />
                        )} />
                    </div>
                </div>
            </div>

            <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                    <CreditCard />
                    <h3>3. Configuración de Pago</h3>
                </div>
                <div className={styles.grid2}>
                    <Controller name="paymentMethodId" control={control} render={({ field }) => (
                        <Select
                            {...field}
                            label="Método de pago preferido"
                            placeholder="Seleccione un método de pago"
                            errorMessage={errors.paymentMethodId?.message}
                            invalid={!!errors.paymentMethodId}
                            options={[
                                { label: "Tarjeta de Crédito", value: PaymentMethod.CREDIT_CARD.toString() },
                                { label: "Tarjeta de Débito", value: PaymentMethod.DEBIT_CARD.toString() }
                            ]}
                        />
                    )} />

                    <div className={styles.checkboxes}>
                        <Controller name="startTrial" control={control} render={({ field }) => (
                            <Checkbox {...field} label={`Iniciar con ${selectedPlan.trialDays} días de prueba gratuita`} size="small" value="true" />
                        )} />
                        {/* autoRenew está oculto o podriamos mostrarlo para dar info */}
                    </div>
                </div>
            </div>

            <div className={styles.submitSection}>
                <Button
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    loading={submissionState.isLoading}
                >
                    {submissionState.isLoading ? 'Procesando...' : `Crear mi cuenta y comenzar con Plan ${selectedPlan.name}`}
                </Button>
            </div>
        </form>
    );
}
