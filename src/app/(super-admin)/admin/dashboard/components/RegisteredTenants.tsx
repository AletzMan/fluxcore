"use client";
import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";
import { ButtonData } from "@/pp/components/ui/ButtonData/ButtonData";

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
        <DashboardCard title="Últimas suscripciones" description="">
            {data.map((row) => (
                <ButtonData key={row.id} id={row.id} title={row.tenant} description={row.plan} extraData={row.status} />
            ))}
        </DashboardCard>
    );
}