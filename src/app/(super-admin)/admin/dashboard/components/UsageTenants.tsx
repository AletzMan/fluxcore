"use client";
import { UsageBar } from "@/app/components/ui/UsageBar/UsageBar";
import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";
import { Link, Tooltip } from "lambda-ui-components";
import { ExternalLink } from "lucide-react";

interface UsageTenantsProps {
    data: {
        tenantId: number;
        tenantName: string;
        planName: string;
        usersUsed: number;
        usersMax: number;
        usersPercent: number;
        productsUsed: number;
        productsMax: number;
        productsPercent: number;
        branchesMax: number;
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
                        color="neutral"
                        type="button"
                        variant="subtle" />
                </Tooltip>
            }
        >
            {data.map((item) => (
                <UsageBar key={item.tenantId} id={item.tenantId} title={item.tenantName} usage={item.usersUsed} limit={item.usersMax} />
            ))}
        </DashboardCard>
    );
}