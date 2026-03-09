import { formatDateTimeShort, formatCurrency } from '@/lib/utils/common-utils';
import styles from './Salepage.module.scss';
import { saleService } from '@/app/services/api/sale.service';
import { TableError } from '@/app/components/ui/TableError/TableError';
import { ContainerSection } from '@/app/components/layout/ContainerSection/ContainerSection';
import { DetailCard } from '@/app/components/ui/DetailCard/DetailCard';

async function getSale(id: string) {
    const sale = await saleService.getSaleById(id);
    return sale;
}

export default async function SalePage({ params }: { params: Promise<{ id: string }> }) {
    const param = await params;
    const sale = await getSale(param.id);

    if (!sale?.data) {
        return <TableError
            isSearch={false}
            isEmptyResponse={true}
            isError={true}
            isNotFound={!sale?.data}
            isMaintenance={sale?.errorCode === "SERVICE_UNAVAILABLE"}
            urlBack="/ventas"
        />;
    }

    const s = sale.data;

    return (
        <ContainerSection
            title={`Detalle de Venta #${s.ticketNumber}`}
            description={`Información completa de la venta y sus pagos.`}
            titleAddButton="Volver a las ventas"
            hrefAddButton="/ventas"
        >
            <div className={styles.salepage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>Folio: {s.ticketNumber}</h1>
                        <div className={styles.headerInfo}>
                            <div className={styles.rowHeader}>
                                <span>Fecha:</span>
                                <span>{formatDateTimeShort(s.saleDate)}</span>
                            </div>
                            <div className={styles.rowHeader}>
                                <span>Cajero:</span>
                                <span>{s.createdBy}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    <DetailCard title="Información General">
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Cliente</span>
                                <span>{s.customer || "Mostrador"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Métodos de Pago</span>
                                <span>{s.payments && s.payments.length > 0 ? s.payments.join(', ') : "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>ID Detalles</span>
                                <span>{s.saleDetailId || "N/A"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    <DetailCard title="Resumen Financiero">
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Subtotal</span>
                                <span>{formatCurrency(s.subTotal)}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Descuentos</span>
                                <span>- {formatCurrency(s.discountTotal)}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Impuestos</span>
                                <span>+ {formatCurrency(s.taxTotal)}</span>
                            </div>
                            <div className={`${styles.row} ${styles.totalRow}`}>
                                <span>Total Final</span>
                                <span>{formatCurrency(s.finalTotal)}</span>
                            </div>
                        </div>
                    </DetailCard>
                </div>
            </div>
        </ContainerSection>
    );
}
