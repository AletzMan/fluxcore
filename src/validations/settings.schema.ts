import { z } from 'zod';
import { ErrorMessages } from '@/lib/errors/message-errors';

export const MaintenanceSchema = z.object({
    enable: z.boolean({ error: ErrorMessages.MAINTENANCE_ENABLE_REQUIRED }),
    message: z.string().max(500, ErrorMessages.MAINTENANCE_MESSAGE_TOO_LONG).optional().or(z.literal('')),
});

export type MaintenanceFormValues = z.infer<typeof MaintenanceSchema>;
