import { ApplicationError } from "@application/shared/errors/application-error";
import { ApplicationErrorCategory } from "@application/shared/errors/application-error-category.enum";

export class PatientConflictError extends ApplicationError {
  constructor() {
    const message = "Patient already exists";
    super(message, ApplicationErrorCategory.CONFLICT);
  }
}
