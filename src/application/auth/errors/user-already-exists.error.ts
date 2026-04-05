import { ApplicationError } from "@application/shared/errors/application-error";
import { ApplicationErrorCategory } from "@application/shared/errors/application-error-category.enum";

export class UserAlreadyExistsError extends ApplicationError {
  constructor() {
    const message = "User already exists";
    super(message, ApplicationErrorCategory.CONFLICT);
  }
}
