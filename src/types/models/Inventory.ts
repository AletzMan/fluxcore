export interface Inventory {
    id: number;
    productVariantId: number;
    productName: string;
    variantName: string;
    sku: string;
    barcode: string;
    stockQuantity: number;
    minStock: number;
    maxStock: number;
    price: number;
    productMasterId: number;
    categoryName: string;
}

