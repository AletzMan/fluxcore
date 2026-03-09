export interface CashSession {
    id: number;
    userName: string;
    openingDate: Date;
    closingDate: Date;
    openingBalance: number;
    totalSalesCash: number;
    totalSalesCard: number;
    totalSalesTransfer: number;
    closingBalance: number | null;
    expectedBalance: number;
    discrepancy: number;
    notes: string | null;
    status: string;
}
