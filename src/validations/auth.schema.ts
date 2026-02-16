import { z } from 'zod';
import { ValidationRules } from '@/validations/validation-rules';
import { ErrorMessages } from '@/lib/errors/message-errors';

export const loginSchema = z.object({
    username: z
        .string()
        .min(1, ErrorMessages.LOGIN_USERNAME_EMPTY)
        .max(ValidationRules.USERNAME.MAX_LENGTH, `Máximo ${ValidationRules.USERNAME.MAX_LENGTH} caracteres`),

    password: z
        .string()
        .min(1, ErrorMessages.LOGIN_PASSWORD_EMPTY)
});

export type LoginFormData = z.infer<typeof loginSchema>;