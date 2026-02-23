import styles from './Subscriptionspage.module.scss'
import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';
import { subscriptionService } from '@/app/services/api/subscription.service';
import { Suspense } from 'react';
import { PagedResponse } from '@/typesAPI/common.types';
import { Subscription } from '@/typesModels/Subscription';
import { GetSubscriptionsParams } from '@/typesAPI/subscription.types';
import { SubscriptionsView } from './components/SubscriptionsView/SubscriptionsView';

const getSubscriptions = async (params: GetSubscriptionsParams) => {
    const response = await subscriptionService.getAllSubscriptions(params);
    return response;
}

export default async function SubscriptionsPage({ searchParams }: {
    searchParams: GetSubscriptionsParams
}) {
    const params = await searchParams;
    const subscriptions: PagedResponse<Subscription> | undefined = await getSubscriptions({ ...params });

    return (
        <ContainerSection
            title="Control de Suscripciones"
            description="Seguimiento de ciclos de facturación, renovaciones y estados de pago de cada suscripción."
        >
            <div className={styles.subscriptions}>
                <Suspense fallback={<div>Cargando...</div>}>
                    <SubscriptionsView
                        subscriptions={subscriptions?.data || []}
                        pagination={subscriptions?.pagination!}
                        success={subscriptions?.success}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
