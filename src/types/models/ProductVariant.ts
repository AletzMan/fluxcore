export interface ProductVariant {
    id: number;
    barcode: string;
    sku: string;
    price: number;
    minStock: number;
    urlImage: string;
    productMasterId: number;
}