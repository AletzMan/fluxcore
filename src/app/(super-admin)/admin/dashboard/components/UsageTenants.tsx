"use client";
import { UsageBar } from "@/app/components/ui/UsageBar/UsageBar";
import { DashboardCard } from "@/pp/components/ui/DashboardCard/DashboardCard";

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
        <DashboardCard title="Uso de recursos" description="Monitoreo del consumo de recursos por tenant">
            {data.map((item) => (
                <UsageBar key={item.id} id={item.id} title={item.title} usage={item.usage} limit={item.limit} />
            ))}
        </DashboardCard>
    );
}