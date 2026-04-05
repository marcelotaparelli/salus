import { DomainError } from "@domain/shared/errors/domain-error";
import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

export class InvalidCpfError extends DomainError {
  constructor() {
    const message = "Invalid CPF";
    super(message, DomainErrorCategory.VALIDATION);
  }
}
