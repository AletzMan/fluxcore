
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
    AcquisitionOfMerchandise = 'G01',
    ReturnsDamagesOrAllowances = 'G02',
    GeneralExpenses = 'G03',
    Construction = 'I01',
    OfficeFurnitureAndEquipment = 'I02',
    TransportEquipment = 'I03',
    ComputerEquipment = 'I04',
    ToolsAndDies = 'I05',
    TelephoneCommunications = 'I06',
    SatelliteCommunications = 'I07',
    OtherMachineryAndEquipment = 'I08',
    MedicalAndDentalExpenses = 'D01',
    DisabilityMedicalExpenses = 'D02',
    FuneralExpenses = 'D03',
    Donations = 'D04',
    WithoutFiscalEffects = 'S01',
    Payments = 'CP01'
}
