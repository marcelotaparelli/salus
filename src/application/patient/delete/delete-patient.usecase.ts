import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { PatientNotFoundError } from "@application/patient/shared/errors/patient-not-found.error";

export class DeletePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(id: string): Promise<void> {
    const foundPatient = await this.patientRepository.findById(id);

    if (!foundPatient) throw new PatientNotFoundError();

    await this.patientRepository.delete(id);
  }
}
