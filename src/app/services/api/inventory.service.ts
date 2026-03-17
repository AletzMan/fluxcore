import { apiFluxCoreServerGet } from "./axios-instance";
import { PagedResponse } from "@/typesAPI/common.types";
import { Inventory } from "@/typesModels/Inventory";
import { InventoryParams } from "@/typesAPI/inventory.types";

class InventoryService {
    async getInventory(params?: InventoryParams): Promise<PagedResponse<Inventory>> {
        const queryParams = new URLSearchParams();
        if (params?.page) queryParams.append("Page", params.page.toString());
        if (params?.pageSize) queryParams.append("PageSize", params.pageSize.toString());
        if (params?.search) queryParams.append("Search", params.search);
        if(params?.sortBy) queryParams.append("SortBy", params.sortBy);
        if(params?.sortDirection) queryParams.append("SortDirection", params.sortDirection);
        
        if (params?.isLowStock !== undefined) queryParams.append("IsLowStock", params.isLowStock.toString());
        if (params?.isOutOfStock !== undefined) queryParams.append("IsOutOfStock", params.isOutOfStock.toString());
        if (params?.isOverStocked !== undefined) queryParams.append("IsOverStocked", params.isOverStocked.toString());
        
        if (params?.minQuantity !== undefined) queryParams.append("MinQuantity", params.minQuantity.toString());
        if (params?.maxQuantity !== undefined) queryParams.append("MaxQuantity", params.maxQuantity.toString());
        if (params?.productMaster) queryParams.append("ProductMaster", params.productMaster.toString());
        if (params?.category) queryParams.append("Category", params.category.toString());

        const response = await apiFluxCoreServerGet<PagedResponse<Inventory>>(`/inventories?${queryParams.toString()}`);
        return response as PagedResponse<Inventory>;
    }
}

export const inventoryService = new InventoryService();
