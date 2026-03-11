
export enum BillingCycle {
    MONTHLY = 1,
    QUARTERLY = 2,
    SEMIANNUAL = 3,
    ANNUAL = 4
}

export enum PlanStatusType {
    ACTIVE = 'ACTIVE',
    TRIAL = 'TRIAL',
    EXPIRED = 'EXPIRED',
    SUSPENDED = 'SUSPENDED',
    CANCELLED = 'CANCELLED'
} 

export enum PaymentMethod {
    CASH = 'CASH',
    CREDIT = 'CREDIT',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    MOBILE_PAYMENT = 'MOBILE_PAYMENT',
    TRANSFER = 'TRANSFER',
    OTHER = 'OTHER'
}

export enum SaleStatus {
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
    DRAFT = 'DRAFT',
    PARTIAL_PAID = 'PARTIAL_PAID',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}
 
export enum SaleAction
{
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    ADD_PAYMENT = 'ADD_PAYMENT',
    CANCEL = 'CANCEL',
    COMPLETE = 'COMPLETE',
    RETURN_SALE = 'RETURN_SALE'
}

export enum CashSessionStatus {
    CLOSE = 'CLOSE',
    OPEN = 'OPEN'
} 

export enum MovementType {
    PURCHASE_RECEIPT = 100,
    CUSTOMER_RETURN = 101,
    POSITIVE_ADJUSTMENT = 102,
    TRANSFER_IN = 103,
    SALE = 200,
    SPOILAGE = 201,
    NEGATIVE_ADJUSTMENT = 202,
    TRANSFER_OUT = 203,
    INTERNAL_CONSUMPTION = 204
}
