
import React from 'react';
import { PlanFormValues } from '@/validations/plan.schema';
import styles from './PlanCard.module.scss';
import {
    Check,
    X,
    Users,
    Package,
    MapPin,
    Zap,
    Shield,
    Globe,
    Terminal,
    Headset,
    BarChart3,
    LineChart,
    Clock,
    ShieldCheck,
    ShieldPlus,
    CircleQuestionMarkIcon
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/common-utils';
import { Badge, Card, Divider, Tag, Tooltip } from 'lambda-ui-components';

interface PlanCardProps {
    plan: Partial<PlanFormValues>;
    isHighlighted?: boolean;
    children?: React.ReactNode;
    type?: 'monthly' | 'yearly';
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isHighlighted = false, children, type = 'monthly' }) => {
    const {
        name = 'Nombre del Plan',
        description = 'Descripción del plan',
        monthlyPrice = 0,
        quarterlyPrice = 0,
        semiannualPrice = 0,
        annualPrice = 0,
        maxUsers = 0,
        maxProducts = 0,
        maxBranches = 0,
        hasInventoryManagement = false,
        hasSalesReports = false,
        hasAdvancedReports = false,
        hasMultiCurrency = false,
        hasApiAccess = false,
        hasPrioritySupport = false,
        features = [],
        trialDays = 0,
    } = plan;

    return (
        <Card className={`${styles.plancard} ${isHighlighted ? styles.plancard_highlighted : ''}`}>

            <header className={styles.plancard_header}>
                <h3 className={styles.plancard_title}>{name}</h3>
                <p className={styles.plancard_description}>{description}</p>
            </header>

            <div className={styles.plancard_pricing}>
                <div className={styles.plancard_main_price}>
                    <span className={styles.plancard_amount}>{type === 'monthly' ? formatCurrency(monthlyPrice) : formatCurrency(annualPrice / 12)}</span>
                    <span className={styles.plancard_period}>/mes</span>
                </div>
                {type === 'yearly' && (
                    <div className={styles.plancard_sub_price}>
                        <span>Facturado anualmente a <strong>{formatCurrency(annualPrice)}/año</strong></span>
                    </div>
                )}
                {type === 'monthly' && (
                    <div className={styles.plancard_sub_price}>
                        <span>Facturado mensualmente</span>
                    </div>
                )}
            </div>

            {children && (
                <div className={styles.plancard_action}>
                    {children}
                </div>
            )}

            <Divider />

            <section className={styles.plancard_features}>
                <h4 className={styles.plancard_features_title}>Módulos Incluidos</h4>
                <ul className={styles.plancard_features_list}>
                    <FeatureItem label="Gestión de Inventario" isEnabled={hasInventoryManagement} icon={<Zap size={16} />} />
                    <FeatureItem label="Reportes de Ventas" isEnabled={hasSalesReports} icon={<BarChart3 size={16} />} />
                    <FeatureItem label="Reportes Avanzados" isEnabled={hasAdvancedReports} icon={<LineChart size={16} />} />
                    {/*<FeatureItem label="Multi-Moneda" isEnabled={hasMultiCurrency} icon={<Globe size={16} />} />*/}
                    <FeatureItem label="Soporte Prioritario" isEnabled={hasPrioritySupport} icon={<Headset size={16} />} />
                    {/*<FeatureItem label="Acceso a API" isEnabled={hasApiAccess} icon={<Terminal size={16} />} />*/}
                </ul>

                {features.length > 0 && (
                    <>
                        <h4 className={`${styles.plancard_features_title} ${styles.mt_4}`}>Características Adicionales</h4>
                        <ul className={styles.plancard_features_list}>
                            {features.sort((a, b) => a.displayOrder - b.displayOrder).map((feature, index) =>
                                <FeatureItem
                                    key={index}
                                    label={feature.name}
                                    description={feature.description}
                                    isEnabled={feature.isEnabled}
                                    icon={<ShieldPlus size={16} />}
                                />
                            )}
                        </ul>
                    </>
                )}
            </section>

        </Card>
    );
};

interface FeatureItemProps {
    label: string;
    description?: string;
    isEnabled: boolean;
    icon: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ label, description, isEnabled, icon }) => (
    <li className={`${styles.feature_item} ${!isEnabled ? styles.feature_item_disabled : ''}`}>
        <div className={styles.feature_icon_wrapper}>
            {icon}
        </div>
        <div className={styles.feature_label}>{label}
            {description && description !== ' ' && (
                <Tooltip content={description} radius="small">
                    <span className={styles.feature_description} ><CircleQuestionMarkIcon size={16} /></span>
                </Tooltip>
            )}
        </div>
        {isEnabled ? (
            <Check size={16} className={styles.feature_check} />
        ) : (
            <X size={16} className={styles.feature_uncheck} />
        )}
    </li>
);
