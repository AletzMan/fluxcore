import { DashboardCard } from "@/app/components/ui/DashboardCard/DashboardCard";
import { ButtonData } from "@/app/components/ui/ButtonData/ButtonData";
import { RecentSaleActivity } from "@/typesAPI/tenantsummary.types";
import { formatCurrency } from "@/lib/utils/common-utils";
import { Tooltip, Link } from "lambda-ui-components";
import { ExternalLink } from "lucide-react";

export const RecentSales = ({ data }: { data: RecentSaleActivity[] }) => {
    return (
        <DashboardCard
            title="Actividad Reciente de Ventas"
            description="Últimas transacciones realizadas en la sucursal"
            headerActions={
                <Tooltip
                    content="Ver todas las ventas"
                    offset={10}
                    color="info"
                >
                    <Link
                        href="/ventas"
                        size="tiny"
                        type="button"
                        color="neutral"
                        variant="subtle"
                        icon={<ExternalLink absoluteStrokeWidth />}
                    />
                </Tooltip>
            }
        >
            {data.map((row) => (
                <ButtonData
                    key={row.saleId}
                    id={row.saleId}
                    title={row.customerName || 'Cliente de mostrador'}
                    description={`Factura: ${row.invoiceNumber} • ${new Date(row.date).toLocaleDateString()}`}
                    extraData={formatCurrency(row.total)}
                />
            ))}
        </DashboardCard>
    );
}
