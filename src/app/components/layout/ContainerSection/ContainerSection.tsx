import { Breadcrumb, Divider, Link } from 'lambda-ui-components';
import styles from './ContainerSection.module.scss'
import { Plus } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

interface ContainerSectionProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    breadcrumb?: BreadcrumbItem[];
    titleAddButton?: string;
    hrefAddButton?: string;
}

export const ContainerSection = ({ children, title, description, breadcrumb, titleAddButton, hrefAddButton }: ContainerSectionProps) => {
    return (
        <div className={`${styles.container}  `}>
            <header className={styles.header}>
                <div className={styles.header_content}>
                    {breadcrumb && (
                        <Breadcrumb
                            items={breadcrumb} variant="stepped" color="neutral" size="tiny" radius="small"
                        />
                    )}
                    <h1 className={styles.header_title}>{title}</h1>
                    {description && <span className={styles.header_description}>{description}</span>}
                </div>
                {titleAddButton && hrefAddButton && (
                    <Link
                        className={styles.add_button}
                        href={hrefAddButton}
                        type='button'
                        color='primary'
                        size='tiny'
                        icon={<Plus size={20} absoluteStrokeWidth />}
                        label={titleAddButton}
                    />
                )}
            </header>
            <Divider spacing={10} />
            <div className={`${styles.container_content} scrollBar`}>
                {children}
            </div>
        </div>
    );
}
