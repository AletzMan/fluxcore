import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';
import { saleService } from '@/app/services/api/sale.service';
import { Suspense } from 'react';
import { PagedResponse } from '@/typesAPI/common.types';
import { Sale } from '@/typesModels/Sale';
import { SaleParams } from '@/typesAPI/sale.types';
import { SalesView } from './components/SalesView/SalesView';
import styles from './Salespage.module.scss';

const getSales = async (params: SaleParams) => {
    try {
        return await saleService.getAllSales(params);
    } catch {
        return { success: false, data: [] } as unknown as PagedResponse<Sale>;
    }
}

export default async function SalesPage({ searchParams }: {
    searchParams: Promise<SaleParams> | SaleParams
}) {
    const params = await searchParams;
    const sales = await getSales({ ...params });

    return (
        <ContainerSection
            title="Gestión de Ventas"
            description="Consulta el historial de ventas, facturas y pagos realizados."
        >
            <div className={styles.sales}>
                <Suspense fallback={<div>Cargando...</div>}>
                    <SalesView
                        sales={sales?.data || []}
                        pagination={sales?.pagination!}
                        success={sales?.success}
                        isMaintenance={sales?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
