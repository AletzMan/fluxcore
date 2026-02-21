import { formatDateTimeLong } from '@/utils/common-utils';
import styles from './TenantPage.module.scss';
import { tenantService } from '@/app/services/api/tenant.service';
import { TableError } from '@/pp/components/ui/TableError/TableError';
import { ContainerSection } from '@/pp/components/layout/ContainerSection/ContainerSection';
import { Divider, Tag } from 'lambda-ui-components';
import { DetailCard } from '../../components/DetailCard/DetailCard';
import { EditSection } from '../../components/EditSection/EditSection';
import { EditTenantFormWrapper } from '../components/EditTenantFormWrapper/EditTenantFormWrapper';
import { TENANT_SECTIONS } from '@/app/constants/tenantSections';

import { PlanStatusType } from '@/enums/common.enums';

function getStatusColor(status: PlanStatusType): 'success' | 'warning' | 'danger' | 'primary' | 'neutral' | 'secondary' | 'info' {
    switch (status) {
        case PlanStatusType.ACTIVE: return 'success';
        case PlanStatusType.TRIAL: return 'primary';
        case PlanStatusType.SUSPENDED: return 'warning';
        case PlanStatusType.EXPIRED:
        case PlanStatusType.CANCELLED: return 'danger';
        default: return 'neutral';
    }
}

async function getTenant(id: number) {
    const tenant = await tenantService.getTenantById(id);
    return tenant;
}

export default async function TenantPage({ params }: { params: { id: string } }) {
    const param = await params;
    const tenant = await getTenant(Number(param.id));

    if (!tenant) {
        return <TableError
            isSearch={false}
            isEmptyResponse={true}
            isError={true}
        />;
    }

    return (
        <ContainerSection
            title="Detalles del Tenant"
            description={`Información detallada sobre el tenant ${tenant.companyName}`}
        >
            <div className={styles.tenantpage}>
                <header>
                    <div className={styles.titleSection}>
                        <h1>{tenant.companyName}</h1>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Tag
                                text={tenant.status}
                                color={getStatusColor(tenant.status)}
                                size='small'
                                radius='small'
                                variant='subtle'
                            />
                            <Tag
                                text={tenant.isActive ? 'Activo' : 'Inactivo'}
                                color={tenant.isActive ? 'success' : 'danger'}
                                size='small'
                                radius='small'
                                variant='subtle'
                            />
                        </div>
                    </div>
                </header>

                <div className={styles.grid}>
                    {/* General Information */}
                    <DetailCard
                        title="Información General"
                        editAction={<EditSection sectionId={TENANT_SECTIONS.GENERAL} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Compañía</span>
                                <span>{tenant.companyName}</span>
                            </div>
                            <div className={styles.row}>
                                <span>RFC / Tax ID</span>
                                <span>{tenant.taxId || "N/A"}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Dirección</span>
                                <span>{tenant.address || "No especificada"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Contact Information */}
                    <DetailCard
                        title="Contacto"
                        editAction={<EditSection sectionId={TENANT_SECTIONS.CONTACT} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.row}>
                                <span>Email</span>
                                <span>{tenant.email}</span>
                            </div>
                            <div className={styles.row}>
                                <span>Teléfono</span>
                                <span>{tenant.phone || "No especificado"}</span>
                            </div>
                        </div>
                    </DetailCard>

                    {/* Subscription & Status Information */}
                    <DetailCard
                        title="Suscripción & Estado"
                        editAction={<EditSection sectionId={TENANT_SECTIONS.STATUS} />}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.rowInline}>
                                <span>Subscription ID:</span>
                                <span>{tenant.currentSubscriptionId}</span>
                            </div>
                            <div className={styles.rowInline}>
                                <span>Creado el:</span>
                                <span>{formatDateTimeLong(tenant.createdAt?.toString())}</span>
                            </div>
                            <div className={styles.rowInline}>
                                <span>Última modificación:</span>
                                <span>{formatDateTimeLong(tenant.lastModifiedAt?.toString())}</span>
                            </div>
                        </div>
                    </DetailCard>
                </div>
            </div>
            <EditTenantFormWrapper tenantId={tenant.id} tenant={tenant} />
        </ContainerSection>
    );
}
