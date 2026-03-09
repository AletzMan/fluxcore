import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { inventoryService } from "@/app/services/api/inventory.service";
import { InventoryParams } from "@/typesAPI/inventory.types";
import { Suspense } from "react";
import { PagedResponse } from "@/typesAPI/common.types";
import { Inventory } from "@/typesModels/Inventory";
import { InventoryView } from "./components/InventoryView/InventoryView";
import styles from "./Inventorypage.module.scss";

const getInventory = async (params: InventoryParams) => {
    try {
        return await inventoryService.getInventory(params);
    } catch {
        return { success: false, data: [] } as unknown as PagedResponse<Inventory>;
    }
}

export default async function InventoryPage({ searchParams }: {
    searchParams: Promise<InventoryParams> | InventoryParams
}) {
    const params = await searchParams;
    const inventory = await getInventory({ ...params });

    return (
        <ContainerSection
            title="Inventario de Productos"
            description="Gestiona tu stock, listas de precios y variantes de productos."
        >
            <div className={styles.inventory}>
                <Suspense fallback={<div>Cargando inventario...</div>}>
                    <InventoryView
                        inventoryRows={inventory?.data || []}
                        pagination={inventory?.pagination!}
                        success={inventory?.success}
                        isMaintenance={inventory?.errorCode === "SERVICE_UNAVAILABLE"}
                    />
                </Suspense>
            </div>
        </ContainerSection>
    );
}
