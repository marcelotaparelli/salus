import { Patient } from "@domain/patient/patient.entity";
import { PatientRepository } from "@domain/patient/patient.repository";

export class UpdatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(patient: Patient): Promise<void> {
    const foundPatient = await this.patientRepository.findById(patient.id);

    if (!foundPatient) throw new Error("Paciente não encontrado");

    await this.patientRepository.save(patient);
  }
}
