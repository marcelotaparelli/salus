import { DomainError } from "@domain/shared/errors/domain-error";
import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

export class InvalidPhoneError extends DomainError {
  constructor() {
    const message =
      "Phone must have 11 not repeated digits and 9 as the third one";
    super(message, DomainErrorCategory.VALIDATION);
  }
}
