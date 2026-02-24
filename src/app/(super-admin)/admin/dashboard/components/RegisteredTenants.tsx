"use client";
import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";
import { ButtonData } from "@/pp/components/ui/ButtonData/ButtonData";
import { Link, Tooltip } from "lambda-ui-components";
import { ExternalLink } from "lucide-react";

export interface TableData {
    id: number;
    tenantName: string;
    planName: string;
    status: string;
    billingCycle: string;
    price: number;
    startDate: string;
    endDate: string;
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
                <ButtonData key={row.id} id={row.id} title={row.tenantName} description={row.planName} extraData={row.status} />
            ))}
        </DashboardCard>
    );
}