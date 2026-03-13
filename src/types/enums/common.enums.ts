
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
 
export enum TaxRegime {
    GeneralMoralPerson = 601,
    MoralPersonNonProfit = 603,
    WagesAndSalaries = 605,
    Leasehold = 606,
    AlienationOrAcquisitionOfGoods = 607,
    OtherIncomes = 608,
    Consolidation = 609,
    ForeignResidents = 610,
    Dividends = 611,
    PhysicalPersonWithBusinessActivities = 612,
    Interests = 614,
    Prizes = 615,
    NoTaxObligations = 616,
    CooperativeProductionSocieties = 620,
    FiscalIncorporation = 621,
    AgricultureAndFishing = 622,
    OptionalForGroupsOfCompanies = 623,
    Coordinated = 624,
    TechnologicalPlatforms = 625,
    SimplifiedTrustRegime = 626
}

export enum CfdiUsage {
    AcquisitionOfMerchandise = 0,
    ReturnsDamagesOrAllowances = 1,
    GeneralExpenses = 2,
    Construction = 3,
    OfficeFurnitureAndEquipment = 4,
    TransportEquipment = 5,
    ComputerEquipment = 6,
    ToolsAndDies = 7,
    TelephoneCommunications = 8,
    SatelliteCommunications = 9,
    OtherMachineryAndEquipment = 10,
    MedicalAndDentalExpenses = 11,
    DisabilityMedicalExpenses = 12,
    FuneralExpenses = 13,
    Donations = 14,
    WithoutFiscalEffects = 15,
    Payments = 16
} 

export enum UserRole {
    SUPER_ADMIN = 1,
    ADMIN = 2,
    MANAGER = 3,
    PURCHASING_AGENT = 4,
    CASHIER = 5,
    STOCK_CLERK = 6
}