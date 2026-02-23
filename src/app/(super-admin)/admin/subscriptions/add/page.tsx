import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { FormSubscription } from './components/FormSubscription/FormSubscription';

export default function AddSubscriptionPage() {
    return (
        <ContainerSection
            title="Crear Nueva Suscripción"
            description="Asignar un plan a un tenant para iniciar su suscripción."
        >
            <FormSubscription />
        </ContainerSection>
    );
}
