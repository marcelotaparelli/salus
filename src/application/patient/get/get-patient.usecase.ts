import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { PatientMapper } from "@application/patient/shared/mappers/patient-response.mapper";
import { PatientResponseDTO } from "@application/patient/shared/dtos/patient-response.dto";

export class GetPatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(id: string): Promise<PatientResponseDTO | null> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) return null;
    return PatientMapper.toResponse(patient);
  }
}
