import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { customerService } from "@/app/services/api/customer.service";
import styles from "./CustomerDetailPage.module.scss";
import { Link, Tag } from "lambda-ui-components";
import { MoveLeft } from "lucide-react";
import { DetailCard } from "@/app/components/ui/DetailCard/DetailCard";
import { EditSection } from "@/app/(super-admin)/admin/components/EditSection/EditSection";
import { CUSTOMER_SECTIONS } from "@/app/constants/customerSections";
import { EditCustomerFormWrapper } from "../components/EditCustomerFormWrapper/EditCustomerFormWrapper";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let customer = null;
    let isError = false;

    try {
        const res = await customerService.getCustomerById(Number(id));
        if (res.success && res.data) {
            customer = res.data;
        } else {
            isError = true;
        }
    } catch (error) {
        isError = true;
    }

    if (isError || !customer) {
        return (
            <ContainerSection
                title="Cliente no encontrado"
                description="El cliente que intentas visualizar no existe o hubo un error."
            >
                <div style={{ display: 'flex', paddingTop: '1rem' }}>
                    <Link
                        href="/personas/clientes"
                        icon={<MoveLeft />}
                        label="Regresar a Clientes"
                        variant="subtle"
                    />
                </div>
            </ContainerSection>
        );
    }

    return (
        <ContainerSection
            title={`Perfil del Cliente`}
            description="Visualiza y edita los datos específicos de tu cliente por secciones."
        >
            <div className={styles.customerpage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>{customer.firstName} {customer.lastName}</h1>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* Información General */}
                    <DetailCard
                        title="Información Personal"
                        editAction={<EditSection sectionId={CUSTOMER_SECTIONS.GENERAL} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Nombre(s)</span>
                                <span>{customer.firstName}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Apellidos</span>
                                <span>{customer.lastName}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Contacto */}
                    <DetailCard
                        title="Contacto y Dirección"
                        editAction={<EditSection sectionId={CUSTOMER_SECTIONS.CONTACT} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Correo Electrónico</span>
                                <span>{customer.email || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Teléfono</span>
                                <span>{customer.phoneNumber || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Dirección Completa</span>
                                <span>{customer.address || "No especificada"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Datos Fiscales */}
                    <DetailCard
                        title="Datos Fiscales"
                        editAction={<EditSection sectionId={CUSTOMER_SECTIONS.TAX} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>RFC</span>
                                <span>{customer.rfc || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Código Postal</span>
                                <span>{customer.address || "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Régimen Fiscal</span>
                                <span>{customer.taxRegimeCode ? `Régimen ${customer.taxRegimeCode}` : "No especificado"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Uso de CFDI</span>
                                <span>{customer.cfdiUsageCode || "No especificado"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Estado e Información Financiera */}
                    <DetailCard
                        title="Estado de la Cuenta"
                        editAction={<EditSection sectionId={CUSTOMER_SECTIONS.STATUS} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.rowInline}>
                                <span>Estado en el sistema:</span>
                                <Tag
                                    text={customer.isActive ? 'Activo' : 'Inactivo'}
                                    color={customer.isActive ? 'success' : 'neutral'}
                                    size='small'
                                    radius='small'
                                    variant='subtle'
                                />
                            </div>
                            <div className={styles.rowInline}>
                                <span>Saldo Actualizado:</span>
                                <span style={{ color: (customer.currentBalance || 0) < 0 ? 'var(--danger-color)' : (customer.currentBalance || 0) > 0 ? 'var(--success-color)' : 'inherit' }}>
                                    ${(customer.currentBalance || 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </DetailCard>
                </div>
            </div>

            {/* Wrapper que maneja los modales de edición (Dialog) */}
            <EditCustomerFormWrapper customerId={customer.id} customer={customer} />
        </ContainerSection>
    );
}
