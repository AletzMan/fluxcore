import styles from './SystemLogspage.module.scss'
import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';

export default function SystemLogsPage() {
    return (
        <ContainerSection title="Trazabilidad Técnica" description="Auditoría de eventos, registro de excepciones y actividad crítica de la API en tiempo real.">
            <div className={styles.system_logs}></div>
        </ContainerSection>
    );
}
