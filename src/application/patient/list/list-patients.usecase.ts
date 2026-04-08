import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { PatientResponseDTO } from "@application/patient/shared/dtos/patient-response.dto";
import { PatientResponseMapper } from "@application/patient/shared/mappers/patient-response.mapper";

export class ListPatientsUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(): Promise<PatientResponseDTO[]> {
    const patientList = await this.patientRepository.findAll();
    const toResponsePatientList = patientList.map(
      PatientResponseMapper.toResponse,
    );
    return toResponsePatientList;
  }
}
