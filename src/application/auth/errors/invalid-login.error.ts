import { ApplicationError } from "@application/shared/errors/application-error";
import { ApplicationErrorCategory } from "@application/shared/errors/application-error-category.enum";

export class InvalidLoginError extends ApplicationError {
  constructor() {
    const message = "Invalid user or password";
    super(message, ApplicationErrorCategory.UNAUTHORIZED);
  }
}
