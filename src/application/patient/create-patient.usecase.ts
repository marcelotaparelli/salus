import { Patient } from "@domain/patient/patient.entity";
import { CreatePatientDTO } from "@application/patient/create-patient.dto";
import { PatientRepository } from "@domain/patient/patient.repository";

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(input: CreatePatientDTO): Promise<Patient> {
    const patient = Patient.create(
      input.name,
      input.cpf,
      input.phone,
      input.birthDate,
    );

    await this.patientRepository.save(patient);

    return patient;
  }
}
