import { Patient } from "@domain/patient/entities//patient.entity";
import { CreatePatientDTO } from "@application/patient/create/create-patient.dto";
import { PatientResponseDTO } from "@application/patient/shared/dtos/patient-response.dto";
import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { PatientMapper } from "@application/patient/shared/mappers/patient-response.mapper";

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(input: CreatePatientDTO): Promise<PatientResponseDTO> {
    const patient = Patient.create(input);

    await this.patientRepository.save(patient);

    return PatientMapper.toResponse(patient);
  }
}
