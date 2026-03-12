import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { tenantSettingsService } from "@/app/services/api/tenant-settings.service";
import styles from "./SettingsStorePage.module.scss";
import { DetailCard } from "@/app/components/ui/DetailCard/DetailCard";
import { EditSection } from "@/app/(super-admin)/admin/components/EditSection/EditSection";
import { TENANT_SETTINGS_SECTIONS } from "@/app/constants/tenantSettingsSections";
import { EditTenantSettingsFormWrapper } from "./components/EditTenantSettingsFormWrapper/EditTenantSettingsFormWrapper";
import { TableError } from "@/app/components/ui/TableError/TableError";

export default async function SettingsStorePage() {
    let settings = null;
    let isError = false;
    let errorCode = "";

    try {
        const res = await tenantSettingsService.getMyTenantSettings();
        if (res.success && res.data) {
            settings = res.data;
        } else {
            isError = true;
            errorCode = res.errorCode || "";
        }
    } catch (error: any) {
        isError = true;
        errorCode = error?.errorCode || "";
    }

    if (isError || !settings) {
        return (
            <ContainerSection
                title="Configuración"
                description="Gestión de los datos maestros de tu sucursal."
            >
                <div className={styles.settingspage}>
                    <TableError
                        isError={isError}
                        isMaintenance={errorCode === "SERVICE_UNAVAILABLE"}
                        isEmptyResponse={!settings && !isError}
                        isNotFound={errorCode === "NOT_FOUND"}
                        isSearch={false}
                        hasAddButton={false}
                    />
                </div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title="Configuración de Sucursal/Empresa"
            description="Edita los datos de la sucursal, ticket, y métodos de pago aceptados."
        >
            <div className={styles.settingspage}>
                <div className={styles.grid}>
                    {/* Identidad */}
                    <DetailCard
                        title="Identidad de la Empresa"
                        editAction={<EditSection sectionId={TENANT_SETTINGS_SECTIONS.GENERAL} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Nombre Comercial</span>
                                <span>{settings.companyName}</span>
                            </div>
                            <div className={styles.row}>
                                <span>RFC</span>
                                <span>{settings.taxId || "Sin registrar"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Contacto */}
                    <DetailCard
                        title="Datos de Contacto y Ubicación"
                        editAction={<EditSection sectionId={TENANT_SETTINGS_SECTIONS.CONTACT} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Correo Electrónico</span>
                                <span>{settings.email || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Teléfono</span>
                                <span>{settings.phone || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Dirección Física</span>
                                <span>{settings.address || "No especificada"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Branding */}
                    <DetailCard
                        title="Branding y Logo"
                        editAction={<EditSection sectionId={TENANT_SETTINGS_SECTIONS.LOGO} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.logoPreview}>
                                {settings.logoUrl ? (
                                    <img src={settings.logoUrl} alt="Logo" />
                                ) : (
                                    <span>Sin Logo</span>
                                )}
                            </div>
                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--foreground-secondary-color)' }}>
                                Este logo se utilizará en tus comprobantes de venta y reportes.
                            </p>
                        </div>
                    </DetailCard>
                </div>
            </div>

            <EditTenantSettingsFormWrapper settings={settings} />
        </ContainerSection>
    );
}
