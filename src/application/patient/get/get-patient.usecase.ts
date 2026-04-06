import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { PatientMapper } from "@application/patient/shared/mappers/patient-response.mapper";
import { PatientResponseDTO } from "@application/patient/shared/dtos/patient-response.dto";
import { PatientNotFoundError } from "@application/patient/shared/errors/patient-not-found.error";

export class GetPatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(id: string): Promise<PatientResponseDTO> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) throw new PatientNotFoundError();
    return PatientMapper.toResponse(patient);
  }
}
