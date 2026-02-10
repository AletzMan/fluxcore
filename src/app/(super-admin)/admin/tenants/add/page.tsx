import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import styles from './AddPage.module.scss'
import { FormTenant } from '../components/FormTenant/FormTenant';

export default function AddPage() {
    return (
        <ContainerSection
            title="Agregar Comercio"
            description="Agregar un nuevo comercio para que pueda ser gestionado por el usuario."
        >
            <FormTenant />
        </ContainerSection>
    );
}
