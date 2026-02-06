import styles from './Tenantspage.module.scss'
import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';
import { tenantService } from '@/app/services/api/tenant.service';
import { Suspense } from 'react';
import { PagedResponse } from '@/typesAPI/common.types';
import { Tenant } from '@/typesModels/Tenant';
import { GetTenantsParams } from '@/typesAPI/tenant.types';
import { TenantsView } from './components/TenantsView/TenantsView';

const getTenants = async (params: GetTenantsParams) => {
    const response = await tenantService.getAllTenants(params);
    return response;
}

export default async function TenantsPage({ searchParams }: {
    searchParams: GetTenantsParams
}) {

    const params = await searchParams;
    const tenants: PagedResponse<Tenant> | undefined = await getTenants({ ...params });
    return (
        <ContainerSection title="Gestión de Comercios" description="Administración de empresas registradas y configuración de datos maestros por cliente.">
            <div className={styles.tenants}>
                <Suspense fallback={<div>Cargando...</div>}>
                    <TenantsView
                        tenants={tenants?.data || []}
                        pagination={tenants?.pagination!}
                        success={tenants?.success}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}

