import { ProductVariant } from "./ProductVariant";

export interface SaleDetail {
    id: number;
    saleId: number;
    quantitySold: number;
    unitPrice: number;
    appliedDiscount: number;
    totalPrice: number;
    productVariant: ProductVariant;
}