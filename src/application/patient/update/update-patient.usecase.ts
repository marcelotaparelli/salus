import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { UpdatePatientDTO } from "@application/patient/update/update-patient.dto";
import { PatientNotFoundError } from "@application/patient/shared/errors/patient-not-found.error";
import { PatientResponseDTO } from "@application/patient/shared/dtos/patient-response.dto";
import { PatientResponseMapper } from "@application/patient/shared/mappers/patient-response.mapper";

export class UpdatePatientUseCase {
  constructor(private patientRepository: PatientRepository) {}

  async execute(clientData: UpdatePatientDTO): Promise<PatientResponseDTO> {
    const foundPatient = await this.patientRepository.findById(clientData.id);

    if (!foundPatient) throw new PatientNotFoundError();

    const updatedPatient = foundPatient.update({
      name: clientData.name,
      phone: clientData.phone,
      birthDate: clientData.birthDate,
    });

    await this.patientRepository.update(updatedPatient);

    return PatientResponseMapper.toResponse(updatedPatient);
  }
}
