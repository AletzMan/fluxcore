import { ErrorMessages } from "@/lib/errors/message-errors";
import { z } from "zod";
 
export const CategorySchema = z.object({
    name: z.string().min(3, { message: ErrorMessages.CATEGORY_NAME_MIN_LENGTH }).max(100, { message: ErrorMessages.CATEGORY_NAME_MAX_LENGTH }),
    description: z.string().max(500, { message: ErrorMessages.CATEGORY_DESCRIPTION_MAX_LENGTH }).optional()
}).refine((data) => data.name !== data.description, {
    message: ErrorMessages.CATEGORY_NAME_DESCRIPTION_SAME,
    path: ["description"]
});

export type CategoryFormValues = z.infer<typeof CategorySchema>;
