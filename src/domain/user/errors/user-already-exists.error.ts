import { DomainError } from "@domain/shared/errors/domain-error";
import { DomainErrorCategory } from "@domain/shared/errors/domain-error-category.enum";

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    const message = "User already exists";
    super(message, DomainErrorCategory.CONFLICT);
  }
}
