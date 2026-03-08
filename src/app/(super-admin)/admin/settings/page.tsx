import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { TableError } from '@/pp/components/ui/TableError/TableError';
import { settingsService } from '@/app/services/api/settings.service';
import { SystemSettingsResponse } from '@/typesModels/Settings';
import { MaintenanceCard } from './components/MaintenanceCard/MaintenanceCard';
import styles from './Settingspage.module.scss';

export default async function SettingsPage() {
    const result = await settingsService.getSettings();

    const data: SystemSettingsResponse = result?.data || {} as SystemSettingsResponse;

    return (
        <ContainerSection title='Ajustes' description='Configuración de la plataforma'>
            {!result?.success || !result?.data ? <TableError
                isError={true}
                isNotFound={false}
                isEmptyResponse={false}
                isSearch={false}
                isMaintenance={data?.maintenance?.isEnabled || false} /> : <div className={styles.settings}>
                <MaintenanceCard data={data.maintenance} />
            </div>}
        </ContainerSection>
    );
}
