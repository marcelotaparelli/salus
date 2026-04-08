import { DomainError } from "@domain/shared/errors/domain-error";
import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

export class InvalidEmailError extends DomainError {
  constructor() {
    const message =
      "E-mail must not be empty, longer than 255 or wrongly formatted";
    super(message, DomainErrorCategory.VALIDATION);
  }
}
