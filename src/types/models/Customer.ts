export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    rfc: string;
    cfdiUsageCode?: string;
    cfdiUsageName?: string;
    taxRegimeCode?: number;
    taxRegimeName?: string;
    email: string;
    phoneNumber: string;
    address: string;
    createdAt: string;
    updatedAt?: string;
    isActive: boolean;
    currentBalance: number;
}