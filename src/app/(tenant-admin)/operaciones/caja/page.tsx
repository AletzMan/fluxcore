import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { cashSessionService } from "@/app/services/api/cash-session.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { CashSession } from "@/typesModels/CashSession";
import { CashSessionParams } from "@/typesAPI/cash-session.types";
import { CashSessionView } from "./components/CashSessionView/CashSessionView";
import styles from "./Cajapage.module.scss";

const getCashSessions = async (params: CashSessionParams) => {
    try {
        return await cashSessionService.getAllSessions(params);
    } catch {
        return { success: false, data: [] } as unknown as PagedResponse<CashSession>;
    }
}

export default async function CajaPage({ searchParams }: {
    searchParams: Promise<CashSessionParams> | CashSessionParams
}) {
    const params = await searchParams;
    const sessions = await getCashSessions({ ...params });

    return (
        <ContainerSection
            title="Caja y Sesiones"
            description="Gestiona las aperturas y los cortes de caja, así como el dinero en efectivo."
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando sesiones de caja...</div>}>
                    <CashSessionView
                        sessions={sessions?.data || []}
                        pagination={sessions?.pagination!}
                        success={sessions?.success}
                        isMaintenance={sessions?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
