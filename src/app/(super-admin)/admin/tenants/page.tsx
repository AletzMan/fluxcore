import styles from './Tenantspage.module.scss'
import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';
import { tenantService } from '@/app/services/api/tenant.service';
import { Suspense } from 'react';
import { TenantTable } from './components/tenantTable/TenantTable';
import { PagedResponse } from '@/typesAPI/common.types';
import { Tenant } from '@/typesModels/Tenant';
import { GetTenantsParams } from '@/typesAPI/tenant.types';

const getTenants = async (params: GetTenantsParams) => {
    const response = await tenantService.getAllTenants(params);
    return response;
}

export default async function TenantsPage({ searchParams }: {
    searchParams: {
        page: number,
        pageSize: number,
        sort: string,
        order: string,
        search: string,
        isActive: boolean,
        subscription: string
    }
}) {

    const { page, pageSize, sort, order, search, isActive, subscription } = await searchParams;
    const tenants: PagedResponse<Tenant> | undefined = await getTenants({ page, pageSize, sort, order, search, isActive, subscription });
    return (
        <ContainerSection title="Gestión de Comercios" description="Administración de empresas registradas y configuración de datos maestros por cliente.">
            <div className={styles.tenants}>
                <Suspense fallback={<div>Cargando...</div>}>
                    <TenantTable data={tenants!} />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
