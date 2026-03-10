"use client";

import { FileSearchCorner, PackageOpen, TriangleAlert, RefreshCcw, Eraser, Plus } from 'lucide-react';
import { Button, Link } from 'lambda-ui-components';
import { useRouter, usePathname } from 'next/navigation';
import styles from './TableError.module.scss';
import { ReactNode } from 'react';

interface TableErrorProps {
    isSearch: boolean;
    isEmptyResponse: boolean;
    isError: boolean;
    isNotFound: boolean;
    isMaintenance: boolean;
    onCreate?: () => void;
    onResetFilters?: () => void;
    onRetry?: () => void;
    urlBack?: string;
    hasAddButton?: boolean;
}

export const TableError = ({
    isSearch,
    isEmptyResponse,
    isError,
    isNotFound,
    isMaintenance,
    onCreate,
    onResetFilters,
    onRetry,
    urlBack,
    hasAddButton = true
}: TableErrorProps) => {

    const router = useRouter();
    const pathname = usePathname();

    const handleRetry = onRetry || (() => window.location.reload());
    const handleReset = onResetFilters || (() => router.replace(pathname));
    const handleCreate = onCreate || (() => router.push(`${pathname}/add`));

    if (!isError && !isSearch && !isEmptyResponse) return null;


    const stateConfig = getStateConfig(isError, isEmptyResponse, isSearch, isNotFound, isMaintenance, hasAddButton);


    if (!stateConfig) return null;

    const handleAction = () => {
        switch (stateConfig.actionType) {
            case 'retry': return handleRetry();
            case 'reset': return handleReset();
            case 'create': return handleCreate();
            case 'back': return urlBack ? router.push(urlBack) : router.back();
        }
    };

    return (
        <div className={styles.tableerror}>
            <div className={styles.tableerror_icon}>
                {stateConfig.icon}
            </div>
            <div className={styles.tableerror_content}>
                <h3>{stateConfig.title}</h3>
                <p>{stateConfig.message}</p>
                {stateConfig.showButton && (
                    <div className={styles.tableerror_action}>
                        {hasAddButton && (
                            <Button
                                variant={stateConfig.btnVariant}
                                color={stateConfig.btnColor}
                                icon={stateConfig.btnIcon}
                                onClick={handleAction}
                                size="small"
                                label={stateConfig.btnLabel}
                            />
                        )}
                        {stateConfig.actionType === 'retry' && (
                            <Link
                                href="https://lambdaflux.com/soporte"
                                variant="soft"
                                color="info"
                                icon={<RefreshCcw size={16} />}
                                label="Contactar soporte"
                                size="small"
                                type='button'
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

interface StateConfig {
    icon: ReactNode;
    title: string;
    message: string;
    showButton: boolean;
    actionType: 'retry' | 'reset' | 'create' | 'back';
    btnLabel: string;
    btnIcon: ReactNode;
    btnVariant: "solid" | "outline" | "soft" | "subtle";
    btnColor: "primary" | "secondary" | "neutral" | "info" | "success" | "danger" | "warning";
}

const getStateConfig = (isError: boolean, isEmptyResponse: boolean, isSearch: boolean, isNotFound: boolean, isMaintenance: boolean, hasAddButton: boolean): StateConfig | undefined => {

    console.log(isError, isEmptyResponse, isSearch, isNotFound, isMaintenance);

    if (isSearch && isEmptyResponse) {
        return {
            icon: <FileSearchCorner size={120} strokeWidth={1.5} />,
            title: "Sin resultados para tu búsqueda",
            message: "No hay registros con los filtros actuales. Intenta limpiarlos.",
            showButton: true,
            actionType: 'reset',
            btnLabel: "Limpiar filtros",
            btnIcon: <Eraser size={16} />,
            btnVariant: "soft",
            btnColor: "info"
        };
    }

    if (isEmptyResponse && !isError) {
        return {
            icon: <PackageOpen size={120} strokeWidth={1.5} className="text-slate-500/50" />,
            title: hasAddButton
                ? "Esto está muy tranquilo..."
                : "Nada que mostrar por ahora",
            message: hasAddButton
                ? "Aún no tienes información aquí. Agrega tu primer registro para darle vida a esta sección."
                : "No hay registros disponibles en este momento. Los datos aparecerán aquí en cuanto haya actividad.",

            showButton: hasAddButton,
            actionType: 'create',
            btnLabel: "Crear el primero",
            btnIcon: <Plus size={16} />,
            btnVariant: "solid",
            btnColor: "primary"
        };
    }

    if (isNotFound) {
        return {
            icon: <TriangleAlert size={120} strokeWidth={1.5} />,
            title: "No se encontró el registro",
            message: "El registro que buscas no existe o ha sido eliminado.",
            showButton: true,
            actionType: 'back',
            btnLabel: "Volver a la lista",
            btnIcon: <RefreshCcw size={16} />,
            btnVariant: "soft",
            btnColor: "danger"
        };
    }

    if (isMaintenance) {
        return {
            icon: <TriangleAlert size={120} strokeWidth={1.5} />,
            title: "El sitio está en mantenimiento",
            message: "Lo sentimos, el sitio está en mantenimiento. Por favor, intenta recargar la página.",
            showButton: true,
            actionType: 'reset',
            btnLabel: "Reintentar conexión",
            btnIcon: <RefreshCcw size={16} />,
            btnVariant: "soft",
            btnColor: "neutral"
        };
    }
    if (isError) {
        return {
            icon: <TriangleAlert size={120} strokeWidth={1.5} />,
            title: "No pudimos cargar la información",
            message: "Ocurrió un problema técnico. Por favor, intenta recargar la página.",
            showButton: true,
            actionType: 'retry',
            btnLabel: "Reintentar conexión",
            btnIcon: <RefreshCcw size={16} />,
            btnVariant: "soft",
            btnColor: "danger"
        };
    }


}