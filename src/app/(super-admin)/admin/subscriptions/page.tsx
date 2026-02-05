import styles from './Subscriptionspage.module.scss'
import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';

export default function SubscriptionsPage() {
    return (
        <ContainerSection title="Control de Suscripciones" description="Seguimiento de ciclos de facturación, renovaciones y estados de pago de cada suscripción.">
            <div className={styles.subscriptions}></div>
        </ContainerSection>
    );
}
