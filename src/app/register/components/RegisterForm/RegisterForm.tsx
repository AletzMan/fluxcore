import { Input, Button, Alert } from "lambda-ui-components";
import { UserIcon, Building, CheckCircle } from "lucide-react";
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
            // Valores internos: el usuario no los ve, se mandan automáticamente
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
                autoRenew: true,
                startTrial: true,
            };

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
                    message: result.message || "Error al registrar la información."
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
                <p>Tu negocio y cuenta de administrador han sido creados.</p>
                <p>Cuentas con <strong>{selectedPlan.trialDays} días de prueba gratuita</strong> en el plan <strong>{selectedPlan.name}</strong>.</p>
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

            <div className={styles.trialBanner}>
                🎉 Comenzarás con <strong>{selectedPlan.trialDays} días de prueba gratuita</strong>. <br />No se requiere método de pago.
            </div>

            <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                    <UserIcon />
                    <h3>1. Tus Datos (Usuario Administrador)</h3>
                </div>
                <div className={styles.grid2}>
                    <Controller name="name" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Nombre Completo"
                            size="small"
                            placeholder="Ej. Juan Pérez"
                            errorMessage={errors.name?.message}
                            invalid={!!errors.name}
                            required />
                    )} />
                    <Controller name="username" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Nombre de Usuario (Login)"
                            size="small"
                            placeholder="Sera usado para tu inicio de sesión"
                            errorMessage={errors.username?.message}
                            invalid={!!errors.username}
                            required />
                    )} />
                    <Controller name="email" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Email Personal"
                            type="email"
                            size="small"
                            placeholder="juan@gmail.com"
                            errorMessage={errors.email?.message}
                            invalid={!!errors.email}
                            required />
                    )} />
                    <Controller name="password" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Contraseña"
                            type="password"
                            size="small"
                            placeholder="********"
                            errorMessage={errors.password?.message}
                            invalid={!!errors.password}
                            required />
                    )} />
                    <Controller name="confirmPassword" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Confirmar Contraseña"
                            type="password"
                            size="small"
                            placeholder="********"
                            errorMessage={errors.confirmPassword?.message}
                            invalid={!!errors.confirmPassword}
                            required />
                    )} />
                </div>
            </div>

            <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                    <Building />
                    <h3>2. Datos de tu Negocio</h3>
                </div>
                <div className={styles.grid2}>
                    <Controller name="companyName" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Nombre del Negocio"
                            size="small"
                            placeholder="Ej. Abarrotes Los Patos"
                            errorMessage={errors.companyName?.message}
                            invalid={!!errors.companyName}
                            required />
                    )} />
                    <Controller name="taxId" control={control} render={({ field }) => (
                        <Input {...field}
                            label="RFC o Identificación Fiscal"
                            size="small"
                            placeholder="XAXX010101000"
                            errorMessage={errors.taxId?.message}
                            invalid={!!errors.taxId}
                            required />
                    )} />
                    <Controller name="companyEmail" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Email del Negocio"
                            type="email"
                            size="small"
                            placeholder="contacto@negocio.com"
                            errorMessage={errors.companyEmail?.message}
                            invalid={!!errors.companyEmail}
                            required />
                    )} />
                    <Controller name="phone" control={control} render={({ field }) => (
                        <Input {...field}
                            label="Teléfono de Contacto"
                            size="small"
                            placeholder="10 dígitos"
                            errorMessage={errors.phone?.message}
                            invalid={!!errors.phone}
                            required />
                    )} />
                    <div style={{ gridColumn: "1 / -1" }}>
                        <Controller name="address" control={control} render={({ field }) => (
                            <Input {...field}
                                label="Dirección Principal"
                                size="small"
                                placeholder="Av siempre viva 123"
                                errorMessage={errors.address?.message}
                                invalid={!!errors.address}
                                required />
                        )} />
                    </div>
                </div>
            </div>

            <div className={styles.submitSection}>
                <Button
                    type="submit"
                    color="primary"
                    size="medium"
                    block
                    loading={submissionState.isLoading}
                >
                    {submissionState.isLoading ? 'Procesando...' : `Comenzar prueba gratuita con Plan ${selectedPlan.name}`}
                </Button>
                <p className={styles.disclaimer}>
                    Al registrarte aceptas nuestros términos de servicio. <br /> No se realizará ningún cobro durante el periodo de prueba.
                </p>
            </div>
        </form>
    );
}
