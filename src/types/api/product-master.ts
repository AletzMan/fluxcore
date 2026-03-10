import { BaseParams } from "./common.types";

export interface CreateProductMaster {
    name: string;
    description: string;
    categoryId: number;
    brandId: number;
}

export interface UpdateProductMaster {
    name?: string;
    description?: string;
    categoryId?: number;
    brandId?: number;
}

export interface ProductMasterParams extends BaseParams {
    search?: string;
    categoryId?: number;
    //brandId?: number;
}