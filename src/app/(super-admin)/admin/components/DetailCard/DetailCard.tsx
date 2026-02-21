import { ReactNode } from "react";
import { Card, Divider } from "lambda-ui-components";
import styles from "./DetailCard.module.scss";

interface DetailCardProps {
    title: string;
    /** Botón o componente de edición (ej. O lápiz `EditPlan`) que se ubicará dentro de la card. */
    editAction?: ReactNode;
    /** Si la card debe expandirse por todas las columnas de la grilla. */
    fullWidth?: boolean;
    /** Clase CSS extra para el contenedor de la Card padre. */
    className?: string;
    /** Contenido interior de la card (después del título y divider). */
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
