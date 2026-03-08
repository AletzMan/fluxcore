import { ReactNode } from "react";
import { Card, Divider } from "lambda-ui-components";
import styles from "./DetailCard.module.scss";

interface DetailCardProps {
    title: string;
    editAction?: ReactNode;
    fullWidth?: boolean;
    className?: string;
    children: ReactNode;
}

export const DetailCard = ({ title, editAction, fullWidth, className = "", children }: DetailCardProps) => {
    return (
        <Card className={`${styles.detailCard} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
            {editAction}
            <h2>{title}</h2>
            <Divider spacing={0} />
            {children}
        </Card>
    );
};
