import { formatDateTimeShort } from '@/utils/common-utils';
import styles from './SubscriptionPage.module.scss';
import { subscriptionService } from '@/app/services/api/subscription.service';
import { TableError } from '@/pp/components/ui/TableError/TableError';
import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { Tag } from 'lambda-ui-components';
import { DetailCard } from '../../components/DetailCard/DetailCard';
import { billingCycleName, getStatusColor, planNameColor, statusComponent } from '@/app/constants/common';

async function getSubscription(id: number) {
    const subscription = await subscriptionService.getSubscriptionById(id);
    return subscription;
}

export default async function SubscriptionPage({ params }: { params: { id: string } }) {
    const param = await params;
    const subscription = await getSubscription(Number(param.id));

    if (!subscription?.data) {
        return <TableError
            isSearch={false}
            isEmptyResponse={true}
            isError={true}
            isNotFound={!subscription}
            isMaintenance={subscription?.errorCode === "SERVICE_UNAVAILABLE"}
            urlBack="/admin/subscriptions"
        />;
    }

    const data = subscription.data;
    const statusText = statusComponent[(data.status || "") as keyof typeof statusComponent] || data.status || "";
    const statusColor = getStatusColor(data.status as any);
    const cycleName = billingCycleName[data.billingCycle as keyof typeof billingCycleName] || data.billingCycle;
    const planColor = planNameColor[data.plan?.name as keyof typeof planNameColor] as "neutral" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | null | undefined;

    return (
        <ContainerSection
            title={`Suscripción #${data.id}`}
            description={`Detalle de la suscripción`}
        >
            <div className={styles.subscriptionpage}>

                {/* ── Hero Header ── */}
                <div className={styles.hero}>
                    <div className={styles.heroLeft}>
                        <h1>{data.tenantName}</h1>
                        <div className={styles.heroMeta}>
                            <Tag
                                text={data.plan?.name}
                                color={planColor}
                                size='small'
                                radius='small'
                                variant='subtle'
                            />
                            <Tag
                                text={statusText}
                                color={statusColor}
                                size='small'
                                radius='small'
                                variant='subtle'
                            />
                            <Tag
                                text={data.autoRenew ? 'Auto-renovación' : 'Sin renovación'}
                                color={data.autoRenew ? 'success' : 'neutral'}
                                size='small'
                                radius='small'
                                variant='subtle'
                            />
                        </div>
                    </div>
                    <div className={styles.heroRight}>
                        <span className={styles.heroPrice}>${data.price}</span>
                        <span className={styles.heroCycle}>{cycleName}</span>
                    </div>
                </div>

                {/* ── Stat Cards ── */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard} data-accent="info">
                        <span className={styles.statLabel}>Días restantes</span>
                        <span className={styles.statValue}>{data.daysRemaining}</span>
                    </div>
                    <div className={styles.statCard} data-accent="success">
                        <span className={styles.statLabel}>Inicio</span>
                        <span className={styles.statValue}>
                            {data.startDate ? formatDateTimeShort(data.startDate.toString()) : "N/A"}
                        </span>
                    </div>
                    <div className={styles.statCard} data-accent="warning">
                        <span className={styles.statLabel}>Vencimiento</span>
                        <span className={styles.statValue}>
                            {data.endDate ? formatDateTimeShort(data.endDate.toString()) : "N/A"}
                        </span>
                    </div>
                    <div className={styles.statCard} data-accent="info">
                        <span className={styles.statLabel}>Próximo cobro</span>
                        <span className={styles.statValue}>
                            {data.nextBillingDate ? formatDateTimeShort(data.nextBillingDate.toString()) : "N/A"}
                        </span>
                    </div>
                </div>

                {/* ── Detail Cards ── */}
                <div className={styles.grid}>
                    {/* Información General */}
                    <DetailCard title="Información General">
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Empresa (Tenant)</span>
                                <span>{data.tenantName}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Plan</span>
                                <span>{data.plan?.name}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Ciclo de Facturación</span>
                                <span>{cycleName}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Precio</span>
                                <span>${data.price}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Método de pago</span>
                                <span>{data.paymentMethodId || "No asignado"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Cancelación & Notas */}
                    <DetailCard title="Cancelación y Notas">
                        <div className={styles.cardContent}>
                            <div className={styles.rowInline}>
                                <span>Cancelado</span>
                                <span>{data.cancelledAt ? formatDateTimeShort(data.cancelledAt.toString()) : 'No cancelada'}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Razón de cancelación</span>
                                <span>{data.cancellationReason || "N/A"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Notas</span>
                                <p className={styles.note}>{data.notes || "Sin notas"}</p>
                            </div>
                            <div className={styles.rowInline}>
                                <span>Creado</span>
                                <span>{data.createdAt ? formatDateTimeShort(data.createdAt.toString()) : "N/A"}</span>
                            </div>
                            <div className={styles.rowInline}>
                                <span>Última modificación</span>
                                <span>{data.lastModifiedAt ? formatDateTimeShort(data.lastModifiedAt.toString()) : "N/A"}</span>
                            </div>
                        </div>
                    </DetailCard>
                </div>

            </div>
        </ContainerSection>
    );
}
