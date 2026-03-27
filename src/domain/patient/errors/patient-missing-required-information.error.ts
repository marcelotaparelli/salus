import { DomainError } from "@domain/shared/errors/domain-error";

export class PatientMissingRequiredInformationError extends DomainError {
  constructor(missingFields: string[]) {
    const message = `Patient cannot be processed. Missing information: ${missingFields.join(", ")}`;
    super(message, "VALIDATION");
  }
}
