/** IDs de las secciones editables de un plan.
 *  Este archivo NO tiene "use client" para que pueda ser importado
 *  tanto en Server Components como en Client Components.
 */
export const PLAN_SECTIONS = {
    GENERAL:  'plan-general',
    PRICING:  'plan-pricing',
    LIMITS:   'plan-limits',
    MODULES:  'plan-modules',
    FEATURES: 'plan-features',
} as const;

export type PlanSectionId = typeof PLAN_SECTIONS[keyof typeof PLAN_SECTIONS];
