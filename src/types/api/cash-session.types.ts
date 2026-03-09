import { CashSessionStatus } from "@/enums/common.enums";
import { BaseParams } from "./common.types";

export interface OpenCashSession {
    openingBalance: number;
}

export interface CloseCashSession {
    closingBalance?: number;
    notes?: string;
}

export interface CashSessionParams extends BaseParams {
    search?: string;
    fromDate?: Date;
    toDate?: Date;
    status?: CashSessionStatus;
    onlyWithDiscrepancies?: boolean;
    userId?: number;
}