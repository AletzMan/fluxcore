import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { providerService } from "@/app/services/api/provider.service";
import styles from "./ProviderDetailPage.module.scss";
import { Link } from "lambda-ui-components";
import { MoveLeft } from "lucide-react";
import { DetailCard } from "@/app/components/ui/DetailCard/DetailCard";
import { EditSection } from "@/app/(super-admin)/admin/components/EditSection/EditSection";
import { PROVIDER_SECTIONS } from "@/app/constants/providerSections";
import { EditProviderFormWrapper } from "../components/EditProviderFormWrapper/EditProviderFormWrapper";

export default async function ProviderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let provider = null;
    let isError = false;

    try {
        const res = await providerService.getProviderById(Number(id));
        if (res.success && res.data) {
            provider = res.data;
        } else {
            isError = true;
        }
    } catch (error) {
        isError = true;
    }

    if (isError || !provider) {
        return (
            <ContainerSection
                title="Proveedor no encontrado"
                description="El proveedor que intentas visualizar no existe o hubo un error."
            >
                <div style={{ display: 'flex', paddingTop: '1rem' }}>
                    <Link
                        href="/personas/proveedores"
                        icon={<MoveLeft />}
                        label="Regresar a Proveedores"
                        variant="subtle"
                    />
                </div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title={`Perfil del Proveedor`}
            description="Visualiza y edita los datos maestros de tu proveedor por secciones."
        >
            <div className={styles.providerpage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>{provider.companyName}</h1>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* Información General */}
                    <DetailCard
                        title="Información General"
                        editAction={<EditSection sectionId={PROVIDER_SECTIONS.GENERAL} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Nombre Comercial</span>
                                <span>{provider.companyName}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Contacto y Domicilio */}
                    <DetailCard
                        title="Contacto de Ventas"
                        editAction={<EditSection sectionId={PROVIDER_SECTIONS.CONTACT} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Nombre de Contacto</span>
                                <span>{provider.contactName || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Correo Electrónico</span>
                                <span>{provider.contactEmail || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Teléfono</span>
                                <span>{provider.contactPhone || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Dirección de envío/matriz</span>
                                <span>{provider.address || "No especificada"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Datos Fiscales */}
                    <DetailCard
                        title="Datos Fiscales"
                        editAction={<EditSection sectionId={PROVIDER_SECTIONS.TAX} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>RFC</span>
                                <span>{provider.rfc || "No especificado"}</span>
                            </div>
                        </div>
                    </DetailCard>
                </div>
            </div>

            <EditProviderFormWrapper providerId={provider.id} provider={provider} />
        </ContainerSection>
    );
}
