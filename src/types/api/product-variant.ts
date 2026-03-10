import { BaseParams } from "./common.types";

export interface CreateProductVariant{
    barcode: string;
    price: number;
    minStock: number;
    productMasterId: number;
    imageFile?: File;
}

export interface UpdateProductVariant { 
    barcode?: string;
    price?: number;
    minStock?: number;
    productMasterId?: number;
    imageFile?: File;
}

export interface ProductVariantParams extends BaseParams {
    search?: string;
    productMaster?: number; 
}
