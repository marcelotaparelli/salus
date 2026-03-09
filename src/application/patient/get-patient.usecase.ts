import { PatientRepository } from "@domain/patient/patient.repository";
import { Patient } from "@domain/patient/patient.entity";

export class GetPatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(id: string): Promise<Patient | null> {
    const patient = await this.patientRepository.findById(id);

    return patient;
  }
}
