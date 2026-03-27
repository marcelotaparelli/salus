import { Name, Cpf, Phone, BirthDate } from "@domain/value-objects";
import { PatientProps, CreatePatientInput } from "@domain/patient/types";
import { PatientMissingRequiredInformationError } from "@domain/patient/errors/patient-missing-required-information.error";

export class Patient {
  private constructor(private props: PatientProps) {}

  public static create(input: CreatePatientInput): Patient {
    const missingFields: string[] = [];
    if (!input.name) missingFields.push("name");
    if (!input.cpf) missingFields.push("cpf");
    if (!input.phone) missingFields.push("phone");
    if (!input.birthDate) missingFields.push("birthDate");

    if (missingFields.length > 0) {
      throw new PatientMissingRequiredInformationError(missingFields);
    }

    return new Patient({
      id: crypto.randomUUID(),
      name: new Name(input.name),
      cpf: new Cpf(input.cpf),
      phone: new Phone(input.phone),
      birthDate: new BirthDate(input.birthDate),
      createdAt: new Date(),
    });
  }

  public static reconstitute(props: PatientProps): Patient {
    return new Patient(props);
  }

  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get cpf() {
    return this.props.cpf;
  }
  get phone() {
    return this.props.phone;
  }
  get birthDate() {
    return this.props.birthDate;
  }
  get createdAt() {
    return this.props.createdAt;
  }
}
