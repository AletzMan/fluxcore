import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { cashSessionService } from "@/app/services/api/cash-session.service";
import { Suspense } from "react";
import { formatCurrency } from "@/lib/utils/common-utils";

export default async function CashSessionDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    return (
        <ContainerSection
            title={`Detalle de Turno #${id}`}
            description="Información detallada de los movimientos, fondo fijo y discrepancias de este corte de caja."
        >
            <div style={{ padding: 'var(--spacing-md)' }}>
                <Suspense fallback={<div>Cargando detalle...</div>}>
                    <CashSessionDetail id={id} />
                </Suspense>
            </div>
        </ContainerSection>
    );
}

async function CashSessionDetail({ id }: { id: string }) {
    let session;
    try {
        const res = await cashSessionService.getSessionById(id);
        session = res.data;
    } catch {
        return <div>Error al cargar la información del turno.</div>;
    }

    if (!session) {
        return <div>Sesión no encontrada.</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                <div>
                    <strong>Usuario:</strong> <p style={{ margin: 0 }}>{session.userName}</p>
                </div>
                <div>
                    <strong>Estado:</strong> <p style={{ margin: 0 }}>{session.status}</p>
                </div>
                <div>
                    <strong>Fondo Fijo (Apertura):</strong> <p style={{ margin: 0 }}>{formatCurrency(session.openingBalance)}</p>
                </div>
                <div>
                    <strong>Fecha Apertura:</strong> <p style={{ margin: 0 }}>{new Date(session.openingDate).toLocaleString()}</p>
                </div>
                <div>
                    <strong>Fecha Cierre:</strong> <p style={{ margin: 0 }}>{session.closingDate ? new Date(session.closingDate).toLocaleString() : 'N/A'}</p>
                </div>
            </div>

            <div style={{ background: 'var(--surface-b)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-box)' }}>
                <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-md)' }}>Totales y Movimientos</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                    <div>
                        <strong>Ventas Efectivo:</strong> <p style={{ margin: 0 }}>{formatCurrency(session.totalSalesCash)}</p>
                    </div>
                    <div>
                        <strong>Ventas Tarjeta:</strong> <p style={{ margin: 0 }}>{formatCurrency(session.totalSalesCard)}</p>
                    </div>
                    <div>
                        <strong>Ventas Transferencias:</strong> <p style={{ margin: 0 }}>{formatCurrency(session.totalSalesTransfer)}</p>
                    </div>
                    <div>
                        <strong>Balance Final Declarado:</strong> <p style={{ margin: 0 }}>{session.closingBalance !== null ? formatCurrency(session.closingBalance) : 'N/A'}</p>
                    </div>
                    <div>
                        <strong>Balance Esperado en Caja:</strong> <p style={{ margin: 0 }}>{formatCurrency(session.expectedBalance)}</p>
                    </div>
                    <div style={{ padding: 'var(--spacing-xs)', backgroundColor: 'var(--surface-a)', borderRadius: 'var(--radius-field)' }}>
                        <strong>Discrepancia:</strong>
                        <p style={{ margin: 0, fontWeight: 'bold', color: session.discrepancy < 0 ? 'var(--danger-color, red)' : 'var(--success-color, green)' }}>
                            {formatCurrency(session.discrepancy)}
                        </p>
                    </div>
                </div>
            </div>

            {session.notes && (
                <div>
                    <strong>Notas del cierre:</strong>
                    <p>{session.notes}</p>
                </div>
            )}
        </div>
    );
}
