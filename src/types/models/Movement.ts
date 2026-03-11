export interface Movement {
    id: number;
    movementCode: string;
    type: string;
    timestamp: Date;
    reason: string;
    quantityChanged: number;
    stockAfterMovement: number;
    referenceDoc?: string;
    userName: string; 
}