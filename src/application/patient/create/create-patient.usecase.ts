import { Patient } from "@domain/patient/entities//patient.entity";
import { CreatePatientDTO } from "@application/patient/create/create-patient.dto";
import { PatientResponseDTO } from "@application/patient/shared/dtos/patient-response.dto";
import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { PatientResponseMapper } from "@application/patient/shared/mappers/patient-response.mapper";
import { PatientConflictError } from "@application/patient/shared/errors/patient-conflict.error";

export class CreatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(input: CreatePatientDTO): Promise<PatientResponseDTO> {
    const patientExists = await this.patientRepository.findByCpf(input.cpf);
    if (patientExists !== null) throw new PatientConflictError();
    const patient = Patient.create(input);
    await this.patientRepository.save(patient);
    return PatientResponseMapper.toResponse(patient);
  }
}
