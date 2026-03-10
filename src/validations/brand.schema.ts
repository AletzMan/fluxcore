import { ErrorMessages } from "@/lib/errors/message-errors";
import { z } from "zod";

/*
   public CreateBrandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithErrorCode("BRAND_NAME_EMPTY")
            .WithMessage("Name cannot be empty.")
            .MinimumLength(3)
            .WithErrorCode("BRAND_NAME_MIN_LENGTH")
            .WithMessage("Name must be at least 3 characters.")
            .WithErrorCode("BRAND_NAME_INVALID");

        RuleFor(x => x.Description)
            .MaximumLength(500)
            .WithErrorCode("BRAND_DESCRIPTION_MAX_LENGTH")
            .WithMessage("Description cannot exceed 500 characters.");

        RuleFor(x => x.LogoFile)
            .Must(file => file == null || file.Length <= 1 * 1024 * 1024) // 1 MB
            .WithErrorCode("BRAND_LOGO_FILE_SIZE_EXCEEDED")
            .WithMessage("The image file size must not exceed 1 MB.")
            .Must(file => file == null ||
                          file.ContentType == "image/jpeg" ||
                          file.ContentType == "image/png" ||
                          file.ContentType == "image/webp")
            .WithErrorCode("BRAND_LOGO_FILE_INVALID")
            .WithMessage("Only JPG, PNG and WEBP images are allowed.");
    }
*/
export const BrandSchema = z.object({  
    name: z.string().min(1, { message: ErrorMessages.BRAND_NAME_EMPTY }).max(100, { message: ErrorMessages.BRAND_NAME_INVALID }),
    description: z.string().max(500, { message: ErrorMessages.BRAND_DESCRIPTION_MAX_LENGTH }).optional(),
    logoFile: z.any().optional()  
}); 

export type BrandFormValues = z.infer<typeof BrandSchema>;
