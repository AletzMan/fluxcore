
import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { FormPlan } from './components/FormPlan/FormPlan';

export default function AddPlanPage() {
    return (
        <ContainerSection
            title="Crear Nueva Membresía"
            description="Definir un nuevo plan de suscripción con sus características y costos."
        >
            <FormPlan />
        </ContainerSection>
    );
}
