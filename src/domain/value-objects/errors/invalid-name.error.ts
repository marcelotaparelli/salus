import { DomainError } from "@domain/shared/errors/domain-error";
import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

export class InvalidNameError extends DomainError {
  constructor() {
    const message = "Nome deve ser maior que 2 e menor que 150";
    super(message, DomainErrorCategory.VALIDATION);
  }
}
