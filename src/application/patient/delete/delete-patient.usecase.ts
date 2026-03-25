import { PatientRepository } from "@domain/patient/repositories/patient.repository";

export class DeletePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(id: string): Promise<void> {
    const foundPatient = await this.patientRepository.findById(id);

    if (!foundPatient) throw new Error("Paciente não encontrado");

    await this.patientRepository.delete(id);
  }
}
