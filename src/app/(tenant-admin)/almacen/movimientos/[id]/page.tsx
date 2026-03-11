import { ContainerSection } from "@/app/components/layout/ContainerSection/ContainerSection";
import { movementService } from "@/app/services/api/movement.service";
import styles from "./MovementDetailPage.module.scss";
import { MoveLeft } from "lucide-react";
import { Link, Divider, Tag } from "lambda-ui-components";

const movementTypeTranslations: Record<string, string> = {
    "100": "Compra",
    "PURCHASE_RECEIPT": "Compra",
    "101": "Devolución Cliente",
    "CUSTOMER_RETURN": "Devolución Cliente",
    "102": "Ajuste Positivo",
    "POSITIVE_ADJUSTMENT": "Ajuste Positivo",
    "103": "Transferencia Entrante",
    "TRANSFER_IN": "Transferencia Entrante",
    "200": "Venta",
    "SALE": "Venta",
    "201": "Merma/Deterioro",
    "SPOILAGE": "Merma/Deterioro",
    "202": "Ajuste Negativo",
    "NEGATIVE_ADJUSTMENT": "Ajuste Negativo",
    "203": "Transferencia Saliente",
    "TRANSFER_OUT": "Transferencia Saliente",
    "204": "Consumo Interno",
    "INTERNAL_CONSUMPTION": "Consumo Interno"
};

const getMovementTypeColor = (type: string) => {
    const t = type.toString().toUpperCase();
    if (["100", "PURCHASE_RECEIPT", "102", "POSITIVE_ADJUSTMENT", "103", "TRANSFER_IN"].includes(t)) {
        return "success";
    }
    if (["200", "SALE", "201", "SPOILAGE", "202", "NEGATIVE_ADJUSTMENT", "203", "TRANSFER_OUT", "204", "INTERNAL_CONSUMPTION"].includes(t)) {
        return "danger";
    }
    return "primary";
};

export default async function MovementDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let movement = null;
    let isError = false;

    try {
        movement = await movementService.getMovementById(Number(id));
    } catch (e) {
        isError = true;
    }

    if (isError || !movement) {
        return (
            <ContainerSection
                title="Movimiento no encontrado"
                description="El movimiento que intentas buscar no existe o hubo un error."
            >
                <div className={styles.backContainer}>
                    <Link
                        href="/almacen/movimientos"
                        icon={<MoveLeft />}
                        label="Regresar a Movimientos"
                        variant="subtle"
                    />
                </div>
            </ContainerSection>
        );
    }

    const isPositive = movement.quantityChanged > 0;

    return (
        <ContainerSection
            title={`Movimiento #${movement.movementCode}`}
            description="Detalles específicos del registro de movimiento de inventario."
        >
            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <Link
                        color="secondary"
                        href="/almacen/movimientos"
                        icon={<MoveLeft />}
                        label="Regresar a Movimientos"
                        variant="subtle"
                        size="small"
                    />
                </div>

                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Información General</h2>
                    <Divider spacing={16} />

                    <div className={styles.grid}>
                        <div className={styles.detail}>
                            <span className={styles.label}>Código de Movimiento</span>
                            <span className={styles.value}>{movement.movementCode}</span>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.label}>Tipo de Movimiento</span>
                            <Tag
                                size="small"
                                variant="subtle"
                                color={getMovementTypeColor(movement.type)}
                            >
                                {movementTypeTranslations[movement.type] || movement.type}
                            </Tag>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.label}>Usuario</span>
                            <span className={styles.value}>{movement.userName || "Sistema"}</span>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.label}>Fecha y Hora</span>
                            <span className={styles.value}>
                                {new Date(movement.timestamp).toLocaleString("es-MX", {
                                    day: "2-digit", month: "long", year: "numeric",
                                    hour: "2-digit", minute: "2-digit"
                                })}
                            </span>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.label}>Documento de Referencia</span>
                            <span className={styles.value}>{movement.referenceDoc || "N/A"}</span>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.label}>Motivo / Razón</span>
                            <span className={styles.value}>{movement.reason || "Sin especificar"}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Detalle de Inventario</h2>
                    <Divider spacing={16} />

                    <div className={styles.grid}>
                        <div className={styles.detail}>
                            <span className={styles.label}>Cantidad Modificada</span>
                            <span className={`${styles.value} ${isPositive ? styles.positiveQty : styles.negativeQty}`}>
                                {isPositive ? "+" : ""}{movement.quantityChanged}
                            </span>
                        </div>

                        <div className={styles.detail}>
                            <span className={styles.label}>Stock Disponible Final</span>
                            <span className={styles.value}>{movement.stockAfterMovement}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerSection>
    );
}
