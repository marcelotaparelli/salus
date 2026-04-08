import { DomainError } from "@domain/shared/errors/domain-error";
import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

export class UserMissingRequiredInformationError extends DomainError {
  constructor(missingFields: string[]) {
    const message = `User missing required fields: ${missingFields.join(", ")}`;
    super(message, DomainErrorCategory.VALIDATION);
  }
}
