export interface Sale {
    id: number;
    ticketNumber: string;
    customer: string | null;
    saleDate: string;
    createdBy: string;
    subTotal: number;
    taxTotal: number;
    discountTotal: number;
    finalTotal: number;
    payments: string[];
    saleDetailId: number;
}