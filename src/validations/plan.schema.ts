
import { ErrorMessages } from "@/lib/errors/message-errors";
import { z } from "zod";

export const PlanSchema = z.object({
    name: z.string({ error: ErrorMessages.PLAN_NAME_REQUIRED, }).min(3, ErrorMessages.PLAN_NAME_TOO_SHORT).max(100, ErrorMessages.PLAN_NAME_TOO_LONG),
    description: z.string({ error: ErrorMessages.PLAN_DESCRIPTION_REQUIRED }).min(10, ErrorMessages.PLAN_DESCRIPTION_TOO_SHORT).max(500, ErrorMessages.PLAN_DESCRIPTION_TOO_LONG),

    // Pricing
    monthlyPrice: z.coerce.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),
    quarterlyPrice: z.coerce.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),
    semiannualPrice: z.coerce.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),
    annualPrice: z.coerce.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),

    // Limits
    maxUsers: z.coerce.number().min(1, ErrorMessages.PLAN_MAX_USERS_INVALID),
    maxProducts: z.coerce.number().min(1, ErrorMessages.PLAN_MAX_PRODUCTS_INVALID),
    maxBranches: z.coerce.number().min(1, ErrorMessages.PLAN_MAX_BRANCHES_INVALID),
    trialDays: z.coerce.number().min(0, ErrorMessages.PLAN_TRIAL_DAYS_INVALID),

    // Features (Booleans)
    hasInventoryManagement: z.boolean(),
    hasSalesReports: z.boolean(),
    hasAdvancedReports: z.boolean(),
    hasMultiCurrency: z.boolean(),
    hasApiAccess: z.boolean(),
    hasPrioritySupport: z.boolean(),
    features: z.array(z.object({
        name: z.string(),
        description: z.string(),
        isEnabled: z.boolean(),
        displayOrder: z.number(),
    })),
});

export type PlanFormValues = z.infer<typeof PlanSchema>;

export const FeatureSchema = z.object({
    features: z.array(z.object({
        id: z.number().optional(),
        name: z.string().min(1, 'El nombre es requerido'),
        description: z.string().min(1, 'La descripción es requerida'),
        isEnabled: z.boolean(),
        displayOrder: z.number(),
    })),
});

export type FeaturesFormValues = z.infer<typeof FeatureSchema>;

export const GeneralSchema = z.object({
    name: z.string().min(3, 'Mínimo 3 caracteres').max(100),
    description: z.string().min(10, 'Mínimo 10 caracteres').max(500),
    isActive: z.boolean(),
    trialDays: z.coerce.number().min(0, 'Debe ser ≥ 0'),
});

export const PricingSchema = z.object({
    monthlyPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
    quarterlyPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
    semiannualPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
    annualPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
});

export const LimitsSchema = z.object({
    maxUsers: z.coerce.number().min(1, 'Mínimo 1'),
    maxProducts: z.coerce.number().min(1, 'Mínimo 1'),
    maxBranches: z.coerce.number().min(1, 'Mínimo 1'),
});

export const ModulesSchema = z.object({
    hasInventoryManagement: z.boolean(),
    hasSalesReports: z.boolean(),
    hasAdvancedReports: z.boolean(),
    hasMultiCurrency: z.boolean(),
    hasApiAccess: z.boolean(),
    hasPrioritySupport: z.boolean(),
});

export type GeneralValues = z.infer<typeof GeneralSchema>;
export type PricingValues = z.infer<typeof PricingSchema>;
export type LimitsValues = z.infer<typeof LimitsSchema>;
export type ModulesValues = z.infer<typeof ModulesSchema>;
