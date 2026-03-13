import { CfdiUsage, TaxRegime } from "@/enums/common.enums";

export enum CUSTOMER_SECTIONS {
    GENERAL = 'section_customer_general',
    CONTACT = 'section_customer_contact',
    TAX = 'section_customer_tax',
    STATUS = 'section_customer_status'
}
 
//Mapeo en español de taxRegime
 
export const TAX_REGIME_MAP = {
    [TaxRegime.GeneralMoralPerson]: "General de Ley Personas Morales",
    [TaxRegime.MoralPersonNonProfit]: "Personas Morales con Fines no Lucrativos",
    [TaxRegime.WagesAndSalaries]: "Sueldos y Salarios e Ingresos Asimilados a Salarios",
    [TaxRegime.Leasehold]: "Arrendamiento",
    [TaxRegime.AlienationOrAcquisitionOfGoods]: "Régimen de Enajenación o Adquisición de Bienes",
    [TaxRegime.OtherIncomes]: "Demás ingresos",
    [TaxRegime.Consolidation]: "Consolidación",
    [TaxRegime.ForeignResidents]: "Residentes en el Extranjero sin Establecimiento Permanente en México",
    [TaxRegime.Dividends]: "Ingresos por Dividendos (socios y accionistas)",
    [TaxRegime.PhysicalPersonWithBusinessActivities]: "Personas Físicas con Actividades Empresariales y Profesionales",
    [TaxRegime.Interests]: "Ingresos por Intereses",
    [TaxRegime.Prizes]: "Régimen de los ingresos por obtención de premios",
    [TaxRegime.NoTaxObligations]: "Sin obligaciones fiscales",
    [TaxRegime.CooperativeProductionSocieties]: "Sociedades Cooperativas de Producción que optan por diferir sus ingresos",
    [TaxRegime.FiscalIncorporation]: "Incorporación Fiscal",
    [TaxRegime.AgricultureAndFishing]: "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras",
    [TaxRegime.OptionalForGroupsOfCompanies]: "Opcional para Grupos de Sociedades",
    [TaxRegime.Coordinated]: "Coordinados",
    [TaxRegime.TechnologicalPlatforms]: "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas",
    [TaxRegime.SimplifiedTrustRegime]: "Régimen Simplificado de Confianza"
}

export const CFDI_USAGE_MAP = {
    [CfdiUsage.AcquisitionOfMerchandise]: "Adquisición de mercancías",
    [CfdiUsage.ReturnsDamagesOrAllowances]: "Devoluciones, descuentos o bonificaciones",
    [CfdiUsage.GeneralExpenses]: "Gastos en general",
    [CfdiUsage.Construction]: "Construcciones",
    [CfdiUsage.OfficeFurnitureAndEquipment]: "Mobiliario y equipo de oficina por inversiones",
    [CfdiUsage.TransportEquipment]: "Equipo de transporte",
    [CfdiUsage.ComputerEquipment]: "Equipo de cómputo y accesorios",
    [CfdiUsage.ToolsAndDies]: "Dados, troqueles, moldes, matrices y herramental",
    [CfdiUsage.TelephoneCommunications]: "Comunicaciones telefónicas",
    [CfdiUsage.SatelliteCommunications]: "Comunicaciones satelitales",
    [CfdiUsage.OtherMachineryAndEquipment]: "Otra maquinaria y equipo",
    [CfdiUsage.MedicalAndDentalExpenses]: "Honorarios médicos, dentales y gastos hospitalarios",
    [CfdiUsage.DisabilityMedicalExpenses]: "Gastos médicos por incapacidad o discapacidad",
    [CfdiUsage.FuneralExpenses]: "Gastos funerales",
    [CfdiUsage.Donations]: "Donativos",
    [CfdiUsage.WithoutFiscalEffects]: "Sin efectos fiscales",
    [CfdiUsage.Payments]: "Pagos / Complemento de pago"
}

export const CFDI_USAGE_CODES = {
    0: "G01",
    1: "G02",
    2: "G03",
    3: "I01",
    4: "I02",
    5: "I03",
    6: "I04",
    7: "I05",
    8: "I06",
    9: "I07",
    10: "I08",
    11: "D01",
    12: "D02",
    13: "D03",
    14: "D04",
    15: "S01",
    16: "CP01"
}