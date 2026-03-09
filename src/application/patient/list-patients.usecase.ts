import { PatientRepository } from "@domain/patient/patient.repository";
import { Patient } from "@domain/patient/patient.entity";

export class ListPatientsUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(): Promise<Patient[]> {
    const patientList = await this.patientRepository.findAll();

    return patientList;
  }
}
