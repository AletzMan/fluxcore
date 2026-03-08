import { DashboardCard } from "@/app/components/ui/DashboardCard/DashboardCard";
import { ButtonData } from "@/app/components/ui/ButtonData/ButtonData";
import { TopSellingProduct } from "@/typesAPI/tenantsummary.types";
import { formatCurrency } from "@/lib/utils/common-utils";
import { Tooltip, Link } from "lambda-ui-components";
import { ExternalLink } from "lucide-react";

export const TopProducts = ({ data }: { data: TopSellingProduct[] }) => {
    return (
        <DashboardCard
            title="Productos más vendidos"
            description="Los productos con mejor rendimiento este mes"
            headerActions={
                <Tooltip
                    content="Ir al inventario"
                    offset={10}
                    color="info"
                >
                    <Link
                        href="/inventario"
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
                    key={row.productId}
                    id={row.productId}
                    title={row.productName}
                    description={`Vendidos: ${row.quantitySold}`}
                    extraData={formatCurrency(row.totalRevenue)}
                />
            ))}
        </DashboardCard>
    );
}
