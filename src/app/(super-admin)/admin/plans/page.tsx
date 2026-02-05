import styles from './Planspage.module.scss'
import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';

export default function PlansPage() {
    return (
        <ContainerSection title="Distribución de Membresías" description="Definición de costos, límites de almacenamiento y características de los planes actuales.">
            <div className={styles.plans}></div>
        </ContainerSection>
    );
}
