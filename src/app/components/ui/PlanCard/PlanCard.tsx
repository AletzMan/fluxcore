
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
    ShieldPlus
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/common-utils';
import { Badge, Card, Divider, Tag } from 'lambda-ui-components';

interface PlanCardProps {
    plan: Partial<PlanFormValues>;
    isHighlighted?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isHighlighted = false }) => {
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
            {trialDays > 0 && (
                <div className={styles.plancard_badge}>
                    <Tag color="info">
                        <Clock size={12} />
                        <span>{trialDays} días de prueba</span>
                    </Tag>
                </div>
            )}

            <header className={styles.plancard_header}>
                <h3 className={styles.plancard_title}>{name}</h3>
                <p className={styles.plancard_description}>{description}</p>
            </header>

            <div className={styles.plancard_pricing}>
                <div className={styles.plancard_main_price}>
                    <span className={styles.plancard_amount}>{formatCurrency(monthlyPrice)}</span>
                    <span className={styles.plancard_period}>/mes</span>
                </div>

                {/*<div className={styles.plancard_secondary_pricing}>
                    <div className={styles.plancard_price_item}>
                        <span>Pago Trimestral:</span>
                        <strong>{formatCurrency(quarterlyPrice)}</strong>
                    </div>
                    <div className={styles.plancard_price_item}>
                        <span>Pago Semestral:</span>
                        <strong>{formatCurrency(semiannualPrice)}</strong>
                    </div>
                    <div className={styles.plancard_price_item}>
                        <span>Pago Anual:</span>
                        <strong>{formatCurrency(annualPrice)}</strong>
                    </div>
                </div>*/}
            </div>

            <Divider />

            <div className={styles.plancard_limits}>
                <div className={styles.plancard_limit_item}>
                    <Users size={18} className={styles.plancard_limit_icon} />
                    <div className={styles.plancard_limit_info}>
                        <span className={styles.plancard_limit_value}>{maxUsers === -1 ? 'Ilimitados' : maxUsers}</span>
                        <span className={styles.plancard_limit_label}>Usuarios</span>
                    </div>
                </div>
                <div className={styles.plancard_limit_item}>
                    <Package size={18} className={styles.plancard_limit_icon} />
                    <div className={styles.plancard_limit_info}>
                        <span className={styles.plancard_limit_value}>{maxProducts === -1 ? 'Ilimitados' : maxProducts}</span>
                        <span className={styles.plancard_limit_label}>Productos</span>
                    </div>
                </div>
                <div className={styles.plancard_limit_item}>
                    <MapPin size={18} className={styles.plancard_limit_icon} />
                    <div className={styles.plancard_limit_info}>
                        <span className={styles.plancard_limit_value}>{maxBranches === -1 ? 'Ilimitadas' : maxBranches}</span>
                        <span className={styles.plancard_limit_label}>Sucursales</span>
                    </div>
                </div>
            </div>

            <Divider />

            <section className={styles.plancard_features}>
                <h4 className={styles.plancard_features_title}>Módulos Incluidos</h4>
                <ul className={styles.plancard_features_list}>
                    <FeatureItem label="Gestión de Inventario" isEnabled={hasInventoryManagement} icon={<Zap size={16} />} />
                    <FeatureItem label="Reportes de Ventas" isEnabled={hasSalesReports} icon={<BarChart3 size={16} />} />
                    <FeatureItem label="Reportes Avanzados" isEnabled={hasAdvancedReports} icon={<LineChart size={16} />} />
                    <FeatureItem label="Multi-Moneda" isEnabled={hasMultiCurrency} icon={<Globe size={16} />} />
                    <FeatureItem label="Acceso a API" isEnabled={hasApiAccess} icon={<Terminal size={16} />} />
                    <FeatureItem label="Soporte Prioritario" isEnabled={hasPrioritySupport} icon={<Headset size={16} />} />
                </ul>

                {features.length > 0 && (
                    <>
                        <h4 className={`${styles.plancard_features_title} ${styles.mt_4}`}>Características Adicionales</h4>
                        <ul className={styles.plancard_features_list}>
                            {features.map((feature, index) => (
                                <FeatureItem
                                    key={index}
                                    label={feature.name}
                                    isEnabled={feature.isEnabled}
                                    icon={<ShieldPlus size={16} />}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </section>
        </Card>
    );
};

interface FeatureItemProps {
    label: string;
    isEnabled: boolean;
    icon: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ label, isEnabled, icon }) => (
    <li className={`${styles.feature_item} ${!isEnabled ? styles.feature_item_disabled : ''}`}>
        <div className={styles.feature_icon_wrapper}>
            {icon}
        </div>
        <span className={styles.feature_label}>{label}</span>
        {isEnabled ? (
            <Check size={16} className={styles.feature_check} />
        ) : (
            <X size={16} className={styles.feature_uncheck} />
        )}
    </li>
);
