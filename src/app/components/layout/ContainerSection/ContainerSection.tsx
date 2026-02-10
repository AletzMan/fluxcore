import { Divider, Link } from 'lambda-ui-components';
import styles from './ContainerSection.module.scss'
import { Plus } from 'lucide-react';

interface ContainerSectionProps {
    children: React.ReactNode;
    title: string;
    description: string;
    titleAddButton?: string;
    hrefAddButton?: string;
}

export const ContainerSection = ({ children, title, description, titleAddButton, hrefAddButton }: ContainerSectionProps) => {
    return (
        <div className={`${styles.container} scrollBar`}>
            <header className={styles.header}>
                <div className={styles.header_content}>
                    <h1 className={styles.header_title}>{title}</h1>
                    <span className={styles.header_description}>{description}</span>
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
            <div className={styles.container_content}>
                {children}
            </div>
        </div>
    );
}
