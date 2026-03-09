import { PaymentMethod, SaleAction, SaleStatus } from "@/enums/common.enums";
import { CreateSaleDetail } from "./sale-detail.types";
import { BaseParams } from "./common.types";
import { Sale } from "@/typesModels/Sale";

export interface CreateSale {
    createdBy: number;
    customerId?: number;
}

export interface AddItemSale {
    saleId: number;
    details: CreateSaleDetail[];
}

export interface RegisterPaymentSale {
    amount: number;
    method: PaymentMethod;
}

export interface UpdateSale {
    status: SaleStatus;
}

export interface SaleParams extends BaseParams {
    search?: string;
    status?: SaleStatus;
    fromDate?: Date;
    toDate?: Date;
    paymentMethod?: PaymentMethod;
    creatorId?: number;
}
 

export interface SaleFlow {
    id: number;
    status: SaleStatus;
    total: number;
    paidAmount: number;
    remainingAmount: number;
    payments: PaymentResponse[];
    saleDetails: Sale[];
    allowedActions: SaleAction[];
}
    