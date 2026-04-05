import { DomainError } from "@domain/shared/errors/domain-error";
import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

export class InvalidBirthDateError extends DomainError {
  constructor() {
    const message =
      "Invalid BirthDate, argument must be of type Date and it can't be a future date or less then 1900";

    super(message, DomainErrorCategory.VALIDATION);
  }
}
