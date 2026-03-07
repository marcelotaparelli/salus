import { Patient } from "@domain/patient/patient.entity";
import { CreatePatientInput } from "@application/patient/patient.types";
import { PatientRepository } from "@domain/patient/patient.repository";

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(input: CreatePatientInput): Promise<Patient> {
    const uuid = crypto.randomUUID();
    const patientInput = new Patient(
      uuid,
      input.name,
      input.phone,
      input.birthDate,
    );

    this.patientRepository.save(patientInput);

    return patientInput;
  }
}
