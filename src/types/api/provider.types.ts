

import { BaseParams } from "./common.types";

export interface CreateProvider {
    companyName: string;
    rfc: string;
    address: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

export interface UpdateProvider {
    companyName: string;
    rfc: string;
    address: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

export interface ProviderParams extends BaseParams {
    search?: string;
}
    