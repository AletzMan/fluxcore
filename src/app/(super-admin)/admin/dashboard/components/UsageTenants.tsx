"use client";
import { UsageBar } from "@/app/components/ui/UsageBar/UsageBar";
import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";
import { Link, Tooltip } from "lambda-ui-components";
import { ExternalLink } from "lucide-react";

interface UsageTenantsProps {
    data: {
        id: number;
        title: string;
        usage: number;
        limit: number;
    }[];
}

export const UsageTenants = ({ data }: UsageTenantsProps) => {
    return (
        <DashboardCard
            title="Uso de recursos"
            description="Monitoreo del consumo de recursos por tenant"
            headerActions={
                <Tooltip
                    content="Ver reporte completo" offset={10}
                    color="info"
                >
                    <Link
                        href="/admin/tenants/usage"
                        icon={<ExternalLink absoluteStrokeWidth />}
                        size="small"
                        color="info"
                        type="button"
                        variant="subtle" />
                </Tooltip>
            }
        >
            {data.map((item) => (
                <UsageBar key={item.id} id={item.id} title={item.title} usage={item.usage} limit={item.limit} />
            ))}
        </DashboardCard>
    );
}