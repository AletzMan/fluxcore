"use client";
import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";
import { ButtonData } from "@/pp/components/ui/ButtonData/ButtonData";
import { Link, Tooltip } from "lambda-ui-components";
import { ExternalLink } from "lucide-react";

export interface TableData {
    id: number;
    tenant: string;
    plan: string;
    status: string;
    revenue: number;
}

interface RegisteredTenantsProps {
    data: TableData[];
}


export function RegisteredTenants({ data }: RegisteredTenantsProps) {
    return (
        <DashboardCard
            title="Últimas suscripciones"
            description=""
            headerActions={
                <Tooltip
                    content="Ver todas las suscripciones"
                    offset={10}
                    color="info"
                >
                    <Link
                        href="/admin/dashboard/tenants"
                        size="small"
                        type="button"
                        color="info"
                        variant="subtle"
                        icon={<ExternalLink absoluteStrokeWidth />}
                    />
                </Tooltip>
            }
        >
            {data.map((row) => (
                <ButtonData key={row.id} id={row.id} title={row.tenant} description={row.plan} extraData={row.status} />
            ))}
        </DashboardCard>
    );
}