
import { ErrorMessages } from "@/lib/errors/message-errors";
import { z } from "zod";

export const PlanSchema = z.object({
    name: z.string({ error: ErrorMessages.PLAN_NAME_REQUIRED, }).min(3, ErrorMessages.PLAN_NAME_TOO_SHORT).max(100, ErrorMessages.PLAN_NAME_TOO_LONG),
    description: z.string({ error: ErrorMessages.PLAN_DESCRIPTION_REQUIRED }).min(10, ErrorMessages.PLAN_DESCRIPTION_TOO_SHORT).max(100, ErrorMessages.PLAN_DESCRIPTION_TOO_LONG),

    // Pricing
    monthlyPrice: z.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),
    quarterlyPrice: z.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),
    semiannualPrice: z.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),
    annualPrice: z.number({ error: ErrorMessages.PLAN_PRICE_REQUIRED }).min(0, ErrorMessages.PLAN_PRICE_MIN),

    // Limits
    maxUsers: z.number().min(1, ErrorMessages.PLAN_MAX_USERS_INVALID),
    maxProducts: z.number().min(1, ErrorMessages.PLAN_MAX_PRODUCTS_INVALID),
    maxBranches: z.number().min(1, ErrorMessages.PLAN_MAX_BRANCHES_INVALID),
    trialDays: z.number().min(0, ErrorMessages.PLAN_TRIAL_DAYS_INVALID),

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
