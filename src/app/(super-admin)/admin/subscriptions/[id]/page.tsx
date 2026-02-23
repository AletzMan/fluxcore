import { formatDateTimeShort } from '@/utils/common-utils';
import styles from './SubscriptionPage.module.scss';
import { subscriptionService } from '@/app/services/api/subscription.service';
import { TableError } from '@/pp/components/ui/TableError/TableError';
import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { Tag } from 'lambda-ui-components';
import { DetailCard } from '../../components/DetailCard/DetailCard';
import { getStatusColor, statusComponent } from '@/app/constants/common';

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
            isNotFound={subscription?.errorCode === "SUBSCRIPTION_NOT_FOUND"}
            urlBack="/admin/subscriptions"
        />;
    }

    return (
        <ContainerSection
            title={`Detalle Suscripción #${subscription.data?.id}`}
            description={`Información detallada sobre la suscripción de ${subscription.data?.tenantName}`}
        >
            <div className={styles.subscriptionpage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>{subscription.data?.tenantName} - Plan ID: {subscription.data?.planId}</h1>
                        <div className={styles.headerInfo}>
                            <div className={styles.rowHeader}>
                                <span>Creado el:</span>
                                <span>{subscription.data?.createdAt ? formatDateTimeShort(subscription.data.createdAt.toString()) : "N/A"}</span>
                            </div>
                            <div className={styles.rowHeader}>
                                <span>Última modificación:</span>
                                <span>{subscription.data?.lastModifiedAt ? formatDateTimeShort(subscription.data.lastModifiedAt.toString()) : "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* General Information */}
                    <DetailCard
                        title="Información General"
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Empresa (Tenant)</span>
                                <span>{subscription.data?.tenantName}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Plan ID</span>
                                <span>{subscription.data?.planId}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Ciclo Facturación</span>
                                <span>{subscription.data?.billingCycle}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Precio</span>
                                <span>${subscription.data?.price}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Status & Dates */}
                    <DetailCard
                        title="Estado & Fechas"
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.rowInline}>
                                <span>Estado:</span>
                                <Tag
                                    text={statusComponent[(subscription.data?.status || "") as keyof typeof statusComponent] || subscription.data?.status || ""}
                                    color={getStatusColor(subscription.data?.status as any)}
                                    size='small'
                                    radius='small'
                                    variant='subtle'
                                />
                            </div>
                            <div className={styles.rowInline}>
                                <span>Auto-Renovación:</span>
                                <Tag
                                    text={subscription.data?.autoRenew ? 'Activa' : 'Inactiva'}
                                    color={subscription.data?.autoRenew ? 'success' : 'danger'}
                                    size='small'
                                    radius='small'
                                    variant='subtle'
                                />
                            </div>
                            <div className={styles.row}>
                                <span>Fecha Inicio</span>
                                <span>{subscription.data?.startDate ? formatDateTimeShort(subscription.data.startDate.toString()) : "N/A"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Fecha Fin</span>
                                <span>{subscription.data?.endDate ? formatDateTimeShort(subscription.data.endDate.toString()) : "N/A"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Próximo Cobro</span>
                                <span>{subscription.data?.nextBillingDate ? formatDateTimeShort(subscription.data.nextBillingDate.toString()) : "N/A"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Additional details */}
                    <DetailCard
                        title="Detalles adicionales"
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Días restantes</span>
                                <span>{subscription.data?.daysRemaining} días</span>
                            </div>
                            <div className={styles.row}>
                                <span>Cancelado</span>
                                <span>{subscription.data?.cancelledAt ? formatDateTimeShort(subscription.data?.cancelledAt?.toString()) : 'N/A'}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Razón Canceleación</span>
                                <span>{subscription.data?.cancellationReason || "N/A"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Notas</span>
                                <span>{subscription.data?.notes || "Sin notas"}</span>
                            </div>
                        </div>
                    </DetailCard>

                </div>
            </div>
        </ContainerSection>
    );
}
