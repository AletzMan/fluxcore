import { Avatar, Link } from 'lambda-ui-components';
import styles from './ButtonData.module.scss'
import { ArrowRightIcon } from 'lucide-react';

interface ButtonDataProps {
    id: number;
    title: string;
    description: string;
    extraData: string;
}

export const ButtonData = ({ id, title, description, extraData }: ButtonDataProps) => {
    return (
        <div className={styles.buttondata}>
            <div className={styles.buttondata_container}>
                <Avatar name={title} size="tiny" className={styles.buttondata_avatar} />
                <div className={styles.buttondata_header}>
                    <h2>{title}</h2>
                    <div className={styles.buttondata_content}>
                        <span>{description}</span>
                        <span>{extraData}</span>
                    </div>
                </div>
            </div>
            <Link
                size="tiny"
                variant="text"
                icon={<ArrowRightIcon absoluteStrokeWidth />}
                href={`/admin/tenants/${id}`}
                type='button'
            />
        </div>
    );
}
