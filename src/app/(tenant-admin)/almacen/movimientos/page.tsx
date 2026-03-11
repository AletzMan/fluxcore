import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { movementService } from "@/app/services/api/movement.service";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { Movement } from "@/typesModels/Movement";
import { MovementParams } from "@/typesAPI/movement.types";
import { MovementView } from "./components/MovementView/MovementView";
import styles from "./MovementPage.module.scss";

const getMovements = async (params: Partial<MovementParams>) => {
    try {
        return await movementService.getMovements(params);
    } catch (error: any) {
        return { success: false, data: [], errorCode: error?.errorCode } as unknown as PagedResponse<Movement>;
    }
}

export default async function MovementPage({ searchParams }: {
    searchParams: Promise<Partial<MovementParams>> | Partial<MovementParams>
}) {
    const params = await searchParams;
    const movements = await getMovements({ ...params });

    return (
        <ContainerSection
            title="Movimientos"
            description="Consulta el historial de movimientos de inventario."
        >
            <div className={styles.container}>
                <Suspense fallback={<div>Cargando movimientos...</div>}>
                    <MovementView
                        movements={movements?.data || []}
                        pagination={movements?.pagination!}
                        success={movements?.success}
                        isMaintenance={movements?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
