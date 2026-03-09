import { BaseParams } from "./common.types";

export interface InventoryParams extends BaseParams {
    search?: string;
    isLowStock?: boolean;
    isOutOfStock?: boolean;
    isOverStocked?: boolean;
    minQuantity?: number;
    maxQuantity?: number;
    productMaster?: number;
    category?: number;
}