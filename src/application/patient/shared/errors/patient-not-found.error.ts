import { ApplicationError } from "@application/shared/errors/application-error";
import { ApplicationErrorCategory } from "@application/shared/errors/application-error-category.enum";

export class PatientNotFoundError extends ApplicationError {
  constructor() {
    const message = "Patient not found";
    super(message, ApplicationErrorCategory.NOT_FOUND);
  }
}
