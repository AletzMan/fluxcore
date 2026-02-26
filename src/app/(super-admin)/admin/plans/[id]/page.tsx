import { formatDateTimeLong } from '@/utils/common-utils';
import styles from './PlanPage.module.scss';
import { planService } from '@/app/services/api/plan.service';
import { TableError } from '@/pp/components/ui/TableError/TableError';
import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { Check, X } from 'lucide-react';
import { Tag } from 'lambda-ui-components';
import { DetailCard } from '../../components/DetailCard/DetailCard';
import { EditSection } from '../../components/EditSection/EditSection';
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

    if (!plan?.data) {
        return <TableError
            isSearch={false}
            isEmptyResponse={false}
            isError={true}
            isNotFound={plan?.errorCode === "PLAN_NOT_FOUND"}
            urlBack="/admin/plans"
        />;
    }

    return (
        <ContainerSection
            title="Detalles del Plan"
            description={`Información detallada sobre el plan ${plan.data!.name}`}
        >
            <div className={styles.planpage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>{plan.data!.name}</h1>
                        <div>
                            <Tag
                                text={plan.data!.isActive ? 'Activo' : 'Inactivo'}
                                color={plan.data!.isActive ? 'success' : 'danger'}
                                size='small'
                                radius='small'
                                variant='subtle'
                            />
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* Información General */}
                    <DetailCard
                        title="Información General"
                        editAction={<EditSection sectionId={PLAN_SECTIONS.GENERAL} />}
                        fullWidth
                    >
                        <div className={styles.cardContent}>
                            <p>{plan.data!.description || "Sin descripción disponible."}</p>
                            <div className={styles.row}>
                                <span>Días de prueba:</span>
                                <span>{plan.data!.trialDays} días</span>
                            </div>
                            <div className={styles.row}>
                                <span>Creado el:</span>
                                <span>{formatDateTimeLong(plan.data!.createdAt?.toString())}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Última modificación:</span>
                                <span>{formatDateTimeLong(plan.data!.lastModifiedAt?.toString())}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Costos y Precios */}
                    <DetailCard
                        title="Precios"
                        editAction={<EditSection sectionId={PLAN_SECTIONS.PRICING} />}
                    >
                        <div className={styles.priceGrid}>
                            <PriceItem label="Mensual" price={plan.data!.monthlyPrice} />
                            <PriceItem label="Trimestral" price={plan.data!.quarterlyPrice} />
                            <PriceItem label="Semestral" price={plan.data!.semiannualPrice} />
                            <PriceItem label="Anual" price={plan.data!.annualPrice} />
                        </div>
                    </DetailCard>

                    {/* Limites del Plan */}
                    <DetailCard
                        title="Límites y Restricciones"
                        editAction={<EditSection sectionId={PLAN_SECTIONS.LIMITS} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Usuarios máximos:</span>
                                <span>{plan.data!.maxUsers === -1 ? 'Ilimitados' : plan.data!.maxUsers}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Productos máximos:</span>
                                <span>{plan.data!.maxProducts === -1 ? 'Ilimitados' : plan.data!.maxProducts}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Sucursales máximas:</span>
                                <span>{plan.data!.maxBranches === -1 ? 'Ilimitadas' : plan.data!.maxBranches}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Características y Módulos */}
                    <DetailCard
                        title="Características Incluidas"
                        editAction={<EditSection sectionId={PLAN_SECTIONS.MODULES} />}
                    >
                        <div className={styles.featureList}>
                            <FeatureItem name="Gestión de Inventario" enabled={plan.data!.hasInventoryManagement} />
                            <FeatureItem name="Reportes de Ventas" enabled={plan.data!.hasSalesReports} />
                            <FeatureItem name="Reportes Avanzados" enabled={plan.data!.hasAdvancedReports} />
                            <FeatureItem name="Multi-Moneda" enabled={plan.data!.hasMultiCurrency} />
                            <FeatureItem name="Acceso API" enabled={plan.data!.hasApiAccess} />
                            <FeatureItem name="Soporte Prioritario" enabled={plan.data!.hasPrioritySupport} />
                        </div>
                    </DetailCard>

                    {/* Características Adicionales (features array) */}
                    <DetailCard
                        title="Características Adicionales"
                        editAction={<EditSection sectionId={PLAN_SECTIONS.FEATURES} />}
                        fullWidth
                    >
                        <div className={styles.cardContent}>
                            {plan.data!.features && plan.data!.features.length > 0 ? (
                                <div className={`${styles.featureList} ${styles.featureListWrap}`}>
                                    {plan.data!.features.map((feature: any) => (
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
                    </DetailCard>
                </div>
            </div>
            <EditFormWrapper planId={plan.data!.id} plan={plan.data!} />
        </ContainerSection>
    );
}