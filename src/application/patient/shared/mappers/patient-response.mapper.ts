import { Patient } from "@domain/patient/entities/patient.entity";
import { PatientResponseDTO } from "@application/patient/shared/dtos/patient-response.dto";

export class PatientMapper {
  public static toResponse(patient: Patient): PatientResponseDTO {
    return {
      id: patient.id,
      name: patient.name.value,
      cpf: patient.cpf.format(),
      phone: patient.phone.format(),
      birthDate: patient.birthDate.value.toISOString(),
      createdAt: patient.createdAt.toISOString(),
    };
  }
}
