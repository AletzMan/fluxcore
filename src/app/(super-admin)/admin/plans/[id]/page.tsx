import { formatDateTimeLong } from '@/utils/common-utils';
import styles from './PlanPage.module.scss';
import { planService } from '@/app/services/api/plan.service';
import { TableError } from '@/pp/components/ui/TableError/TableError';
import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { Check, X } from 'lucide-react';
import { Card, Divider, Tag } from 'lambda-ui-components';
import { EditPlan } from '../components/EditPlan/EditPlan';
import { EditFormWrapper } from '../../components/EditForm/EditFormWrapper';
import { PLAN_SECTIONS } from '@/pp/constants/planSections';

async function getPlan(id: number) {
    const plan = await planService.getPlanById(id);
    return plan;
}

const FeatureItem = ({ name, description, enabled }: { name: string; description?: string; enabled: boolean }) => (
    <div className={`${styles.featureItem} ${enabled ? styles.enabled : styles.disabled}`}>
        <div className={styles.iconWrapper}>
            {enabled ? <Check size={18} className={styles.icon} /> : <X size={18} className={styles.icon} />}
        </div>
        <div className={styles.textContent}>
            <span className={styles.name}>{name}</span>
            {description && <span className={styles.description}>{description}</span>}
        </div>
    </div>
);

const PriceItem = ({ label, price }: { label: string; price: number }) => (
    <div className={styles.priceItem}>
        <label>{label}</label>
        <span>${price ? price.toFixed(2) : '0.00'}</span>
    </div>
);

export default async function PlanPage({ params }: { params: { id: string } }) {
    const param = await params;
    const plan = await getPlan(Number(param.id));

    if (!plan) {
        return <TableError
            isSearch={false}
            isEmptyResponse={true}
            isError={true}
        />;
    }
    console.log(plan);
    return (
        <ContainerSection
            title="Detalles del Plan"
            description={`Información detallada sobre el plan ${plan.name}`}
        >
            <div className={styles.planpage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>{plan.name}</h1>
                        <div>
                            <Tag
                                text={plan.isActive ? 'Activo' : 'Inactivo'}
                                color={plan.isActive ? 'success' : 'danger'}
                                size='small'
                                radius='small'
                                variant='subtle'
                            />
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* Información General */}
                    <Card className={`${styles.card} ${styles.fullWidth}`}>
                        <EditPlan sectionId={PLAN_SECTIONS.GENERAL} />
                        <h2>Información General</h2>
                        <Divider spacing={0} />
                        <div className={styles.cardContent}>
                            <p>{plan.description || "Sin descripción disponible."}</p>
                            <div className={styles.row}>
                                <span>Días de prueba:</span>
                                <span>{plan.trialDays} días</span>
                            </div>
                            <div className={styles.row}>
                                <span>Creado el:</span>
                                <span>{formatDateTimeLong(plan.createdAt?.toString())}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Última modificación:</span>
                                <span>{formatDateTimeLong(plan.lastModifiedAt?.toString())}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Costos y Precios */}
                    <Card className={styles.card}>
                        <EditPlan sectionId={PLAN_SECTIONS.PRICING} />
                        <h2>Precios</h2>
                        <Divider spacing={0} />
                        <div className={styles.priceGrid}>
                            <PriceItem label="Mensual" price={plan.monthlyPrice} />
                            <PriceItem label="Trimestral" price={plan.quarterlyPrice} />
                            <PriceItem label="Semestral" price={plan.semiannualPrice} />
                            <PriceItem label="Anual" price={plan.annualPrice} />
                        </div>
                    </Card>

                    {/* Limites del Plan */}
                    <Card className={styles.card}>
                        <EditPlan sectionId={PLAN_SECTIONS.LIMITS} />
                        <h2>Límites y Restricciones</h2>
                        <Divider spacing={0} />
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Usuarios máximos:</span>
                                <span>{plan.maxUsers === -1 ? 'Ilimitados' : plan.maxUsers}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Productos máximos:</span>
                                <span>{plan.maxProducts === -1 ? 'Ilimitados' : plan.maxProducts}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Sucursales máximas:</span>
                                <span>{plan.maxBranches === -1 ? 'Ilimitadas' : plan.maxBranches}</span>
                            </div>
                        </div>
                    </Card>

                    {/* Características y Módulos */}
                    <Card className={styles.card}>
                        <EditPlan sectionId={PLAN_SECTIONS.MODULES} />
                        <h2>Características Incluidas</h2>
                        <Divider spacing={0} />
                        <div className={styles.featureList}>
                            <FeatureItem name="Gestión de Inventario" enabled={plan.hasInventoryManagement} />
                            <FeatureItem name="Reportes de Ventas" enabled={plan.hasSalesReports} />
                            <FeatureItem name="Reportes Avanzados" enabled={plan.hasAdvancedReports} />
                            <FeatureItem name="Multi-Moneda" enabled={plan.hasMultiCurrency} />
                            <FeatureItem name="Acceso API" enabled={plan.hasApiAccess} />
                            <FeatureItem name="Soporte Prioritario" enabled={plan.hasPrioritySupport} />
                        </div>
                    </Card>

                    {/* Características Adicionales (features array) */}
                    <Card className={`${styles.card} ${styles.fullWidth}`}>
                        <EditPlan sectionId={PLAN_SECTIONS.FEATURES} />
                        <h2>Características Adicionales</h2>
                        <Divider spacing={0} />
                        <div className={styles.cardContent}>
                            {plan.features && plan.features.length > 0 ? (
                                <div className={`${styles.featureList} ${styles.featureListWrap}`}>
                                    {plan.features.map((feature: any) => (
                                        <FeatureItem
                                            key={feature.id ?? feature.name}
                                            name={feature.name}
                                            description={feature.description}
                                            enabled={feature.isEnabled}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: 'var(--foreground-secondary-color)', fontSize: 'var(--font-size-sm)' }}>
                                    No hay características adicionales definidas.
                                </p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            <EditFormWrapper planId={plan.id} plan={plan} />
        </ContainerSection>
    );
}