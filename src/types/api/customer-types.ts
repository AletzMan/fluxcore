import { CfdiUsage, TaxRegime } from "@/enums/common.enums";
import { BaseParams } from "./common.types";

export interface CreateCustomer {
    firstName: string;
    lastName: string;
    rfc: string;
    zipCode: string;
    taxRegime: TaxRegime;
    cfdiUsage: CfdiUsage;
    email: string;
    phoneNumber: string;
    address: string;
}

export interface UpdateCustomer {
    firstName: string;
    lastName: string;
    rfc: string;
    zipCode?: string;
    taxRegime?: TaxRegime;
    cfdiUsage?: CfdiUsage;
    email: string;
    phoneNumber: string;
    address: string;
    isActive: boolean;
}

export interface CustomerParams extends BaseParams {
    search?: string;
    isActive?: boolean;
    taxRegime?: TaxRegime;
    cfdiUsage?: CfdiUsage;
    hasBalance?: boolean;
    zipCode?: string; 
}