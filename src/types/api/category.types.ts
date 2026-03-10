import { BaseParams } from "./common.types";

export interface CreateCategory {
    name: string;
    description?: string;
}

export interface UpdateCategory {
    name: string;
    description?: string;
}

export interface CategoryParams extends BaseParams {
    search: string;
}
    