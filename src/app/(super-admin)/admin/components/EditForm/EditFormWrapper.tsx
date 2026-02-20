"use client";
import { z } from 'zod';
import { EditForm, EditFormField } from './EditForm';
import { EditFeaturesForm } from './EditFeaturesForm';
import { useEditPlanStore } from '@/app/store/editplan.store';
import { Plan } from '@/typesModels/Plan';
import { PLAN_SECTIONS } from '@/pp/constants/planSections';

// ─── Schemas por sección ──────────────────────────────────────────────────────

const GeneralSchema = z.object({
    name: z.string().min(3, 'Mínimo 3 caracteres').max(100),
    description: z.string().min(10, 'Mínimo 10 caracteres').max(500),
    isActive: z.boolean(),
    trialDays: z.coerce.number().min(0, 'Debe ser ≥ 0'),
});

const PricingSchema = z.object({
    monthlyPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
    quarterlyPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
    semiannualPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
    annualPrice: z.coerce.number().min(0, 'Debe ser ≥ 0'),
});

const LimitsSchema = z.object({
    maxUsers: z.coerce.number().min(1, 'Mínimo 1'),
    maxProducts: z.coerce.number().min(1, 'Mínimo 1'),
    maxBranches: z.coerce.number().min(1, 'Mínimo 1'),
});

const ModulesSchema = z.object({
    hasInventoryManagement: z.boolean(),
    hasSalesReports: z.boolean(),
    hasAdvancedReports: z.boolean(),
    hasMultiCurrency: z.boolean(),
    hasApiAccess: z.boolean(),
    hasPrioritySupport: z.boolean(),
});

// ─── Field definitions por sección ────────────────────────────────────────────

type GeneralValues = z.infer<typeof GeneralSchema>;
type PricingValues = z.infer<typeof PricingSchema>;
type LimitsValues = z.infer<typeof LimitsSchema>;
type ModulesValues = z.infer<typeof ModulesSchema>;

const generalFields: EditFormField<GeneralValues>[] = [
    { key: 'name', label: 'Nombre del plan', type: 'text', placeholder: 'Ej. Plan Empresarial' },
    { key: 'description', label: 'Descripción', type: 'textarea', placeholder: 'Breve descripción del plan...' },
    { key: 'isActive', label: 'Activo', type: 'boolean' },
    { key: 'trialDays', label: 'Días de prueba', type: 'number', min: 0 },
];

const pricingFields: EditFormField<PricingValues>[] = [
    { key: 'monthlyPrice', label: 'Precio Mensual', type: 'number', min: 0 },
    { key: 'quarterlyPrice', label: 'Precio Trimestral', type: 'number', min: 0 },
    { key: 'semiannualPrice', label: 'Precio Semestral', type: 'number', min: 0 },
    { key: 'annualPrice', label: 'Precio Anual', type: 'number', min: 0 },
];

const limitsFields: EditFormField<LimitsValues>[] = [
    { key: 'maxUsers', label: 'Máx. Usuarios', type: 'number', min: 1 },
    { key: 'maxProducts', label: 'Máx. Productos', type: 'number', min: 1 },
    { key: 'maxBranches', label: 'Máx. Sucursales', type: 'number', min: 1 },
];

const modulesFields: EditFormField<ModulesValues>[] = [
    { key: 'hasInventoryManagement', label: 'Gestión de Inventario', type: 'boolean' },
    { key: 'hasSalesReports', label: 'Reportes de Ventas', type: 'boolean' },
    { key: 'hasAdvancedReports', label: 'Reportes Avanzados', type: 'boolean' },
    { key: 'hasMultiCurrency', label: 'Multi-Moneda', type: 'boolean' },
    { key: 'hasApiAccess', label: 'Acceso API', type: 'boolean' },
    { key: 'hasPrioritySupport', label: 'Soporte Prioritario', type: 'boolean' },
];

// ─── Wrapper ──────────────────────────────────────────────────────────────────

interface EditFormWrapperProps {
    planId: number;
    plan: Plan;
}

export const EditFormWrapper = ({ planId, plan }: EditFormWrapperProps) => {
    const activeSection = useEditPlanStore((s) => s.activeSection);
    const closeSection = useEditPlanStore((s) => s.closeSection);

    const apiUrl = `/plans/${planId}`;

    return (
        <>
            {/* ── Sección: Información General ── */}
            <EditForm<GeneralValues>
                fields={generalFields}
                defaultValues={{
                    name: plan.name,
                    description: plan.description,
                    isActive: plan.isActive,
                    trialDays: plan.trialDays,
                }}
                schema={GeneralSchema}
                apiUrl={apiUrl}
                title="Información General"
                description="Modifica el nombre, descripción, estado y días de prueba del plan."
                isOpen={activeSection === PLAN_SECTIONS.GENERAL}
                onClose={closeSection}
                id={planId}
            />

            {/* ── Sección: Precios ── */}
            <EditForm<PricingValues>
                fields={pricingFields}
                defaultValues={{
                    monthlyPrice: plan.monthlyPrice,
                    quarterlyPrice: plan.quarterlyPrice,
                    semiannualPrice: plan.semiannualPrice,
                    annualPrice: plan.annualPrice,
                }}
                schema={PricingSchema}
                apiUrl={apiUrl}
                title="Precios"
                description="Actualiza los precios del plan para cada ciclo de pago."
                isOpen={activeSection === PLAN_SECTIONS.PRICING}
                onClose={closeSection}
                id={planId}
            />

            {/* ── Sección: Límites ── */}
            <EditForm<LimitsValues>
                fields={limitsFields}
                defaultValues={{
                    maxUsers: plan.maxUsers,
                    maxProducts: plan.maxProducts,
                    maxBranches: plan.maxBranches,
                }}
                schema={LimitsSchema}
                apiUrl={apiUrl}
                title="Límites y Restricciones"
                description="Define los límites máximos de recursos del plan."
                isOpen={activeSection === PLAN_SECTIONS.LIMITS}
                onClose={closeSection}
                id={planId}
            />

            {/* ── Sección: Módulos ── */}
            <EditForm<ModulesValues>
                fields={modulesFields}
                defaultValues={{
                    hasInventoryManagement: plan.hasInventoryManagement,
                    hasSalesReports: plan.hasSalesReports,
                    hasAdvancedReports: plan.hasAdvancedReports,
                    hasMultiCurrency: plan.hasMultiCurrency,
                    hasApiAccess: plan.hasApiAccess,
                    hasPrioritySupport: plan.hasPrioritySupport,
                }}
                schema={ModulesSchema}
                apiUrl={apiUrl}
                title="Características Incluidas"
                description="Activa o desactiva los módulos disponibles en este plan."
                isOpen={activeSection === PLAN_SECTIONS.MODULES}
                onClose={closeSection}
                id={planId}
            />

            {/* ── Sección: Características Adicionales ── */}
            <EditFeaturesForm
                planId={planId}
                features={plan.features ?? []}
                isOpen={activeSection === PLAN_SECTIONS.FEATURES}
                onClose={closeSection}
            />
        </>
    );
};
