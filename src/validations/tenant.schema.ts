import { z } from 'zod';
import { PlanStatusType } from '@/enums/common.enums';
import { ErrorMessages } from '../lib/errors/message-errors';


export const RegisterTenantSchema = z.object({
    name: z.string({ error: ErrorMessages.TENANT_ADMIN_NAME_REQUIRED }).min(3, ErrorMessages.TENANT_ADMIN_NAME_TOO_SHORT),
    username: z.string({ error: ErrorMessages.TENANT_ADMIN_USERNAME_REQUIRED }).min(3, ErrorMessages.TENANT_ADMIN_USERNAME_TOO_SHORT),
    email: z.email({ error: ErrorMessages.TENANT_ADMIN_EMAIL_INVALID }),
    password: z.string({ error: ErrorMessages.TENANT_ADMIN_PASSWORD_REQUIRED }).min(8, ErrorMessages.TENANT_ADMIN_PASSWORD_TOO_SHORT).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, ErrorMessages.TENANT_ADMIN_PASSWORD_INVALID_FORMAT),
    confirmPassword: z.string({ error: ErrorMessages.TENANT_ADMIN_PASSWORD_REQUIRED }).min(8, ErrorMessages.TENANT_ADMIN_PASSWORD_TOO_SHORT),
    companyName: z.string({ error: ErrorMessages.TENANT_COMPANY_NAME_REQUIRED }).min(3, ErrorMessages.TENANT_COMPANY_NAME_TOO_SHORT).max(100, ErrorMessages.TENANT_COMPANY_NAME_TOO_LONG),
    taxId: z.string({ error: ErrorMessages.TENANT_TAX_ID_REQUIRED }).min(12, ErrorMessages.TENANT_TAX_ID_TOO_SHORT).max(13, ErrorMessages.TENANT_TAX_ID_TOO_LONG),
    address: z.string({ error: ErrorMessages.TENANT_ADDRESS_REQUIRED }).max(200, ErrorMessages.TENANT_ADDRESS_TOO_LONG),
    phone: z.string({ error: ErrorMessages.TENANT_PHONE_REQUIRED }).min(10, ErrorMessages.TENANT_PHONE_TOO_SHORT).max(10, ErrorMessages.TENANT_PHONE_TOO_LONG).regex(/^\d{10}$/, ErrorMessages.TENANT_PHONE_INVALID),
    companyEmail: z.string({ error: ErrorMessages.TENANT_COMPANY_EMAIL_REQUIRED }).email({ error: ErrorMessages.TENANT_COMPANY_EMAIL_INVALID }),
    planId: z.coerce.number({ error: ErrorMessages.TENANT_PLAN_ID_REQUIRED }),
    billingCycle: z.coerce.number({ error: ErrorMessages.TENANT_BILLING_CYCLE_REQUIRED }),
    autoRenew: z.boolean({ error: ErrorMessages.TENANT_AUTO_RENEW_REQUIRED }).optional(),
    startTrial: z.boolean({ error: ErrorMessages.TENANT_START_TRIAL_REQUIRED }).optional(),
    paymentMethodId: z.string({ error: ErrorMessages.TENANT_PAYMENT_METHOD_ID_REQUIRED }),
}).refine((data) => data.password === data.confirmPassword, {
    message: ErrorMessages.TENANT_PASSWORDS_DO_NOT_MATCH,
    path: ["confirmPassword"],
});

export const GeneralSchema = z.object({
    companyName: z.string().min(3, 'Mínimo 3 caracteres').max(100),
    taxId: z.string().min(12, 'RFC inválido').max(13).optional().or(z.literal('')),
    address: z.string().max(200).optional().or(z.literal('')),
});

export const ContactSchema = z.object({
    email: z.string().email('Email inválido'),
    phone: z.string().min(10, 'Debe tener 10 dígitos').max(10).optional().or(z.literal('')),
});

export const StatusSchema = z.object({
    status: z.enum(PlanStatusType as any),
    isActive: z.boolean(),
});

export const LogoSchema = z.object({
    logoFile: z.file().optional().or(z.literal('')),
});

export type GeneralValues = z.infer<typeof GeneralSchema>;
export type ContactValues = z.infer<typeof ContactSchema>;
export type StatusValues = z.infer<typeof StatusSchema>;
export type LogoValues = z.infer<typeof LogoSchema>;