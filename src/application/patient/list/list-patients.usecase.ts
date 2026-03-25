import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";

export class ListPatientsUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(): Promise<Patient[]> {
    const patientList = await this.patientRepository.findAll();

    return patientList;
  }
}
