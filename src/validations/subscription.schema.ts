import { z } from 'zod';
import { BillingCycle } from '@/enums/common.enums';

export const SubscriptionSchema = z.object({
    tenantId: z.number({ error: 'El tenant es requerido' }),
    planId: z.number({ error: 'El plan es requerido' }),
    billingCycle: z.nativeEnum(BillingCycle, { error: 'El ciclo de facturación es requerido' }),
    startDate: z.coerce.date({ error: 'La fecha de inicio es requerida' }),
    isTrial: z.boolean().default(false),
    autoRenew: z.boolean().default(true),
    paymentMethodId: z.string().optional(),
    notes: z.string().max(500, 'Las notas no pueden exceder los 500 caracteres').optional(),
});

export type SubscriptionFormValues = z.infer<typeof SubscriptionSchema>;
