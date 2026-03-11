import { BaseParams } from "./common.types";
import { MovementType } from "../enums/common.enums";

export interface CreateMovementRequest {
    productVariantId: number;
    quantityChanged: number;
    stockAfterMovement: number;
    userId?: number;
    customerId: number;
    referenceDoc?: string;
    reason?: string;
    type: MovementType;
}

export interface MovementParams extends BaseParams {
    search?: string;
    type?: MovementType;
    userId?: number;
    fromDate?: Date;
    toDate?: Date;
}