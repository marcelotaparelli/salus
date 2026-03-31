import { Patient } from "@domain/patient/entities/patient.entity";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

export interface RawPatientProps {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  birthDate: Date;
  createdAt: Date;
}

export class PatientMapper {
  private constructor() {}

  public static toDomain(raw: RawPatientProps): Patient {
    return Patient.reconstitute({
      id: raw.id,
      name: new Name(raw.name),
      cpf: new Cpf(raw.cpf),
      phone: new Phone(raw.phone),
      birthDate: new BirthDate(raw.birthDate),
      createdAt: raw.createdAt,
    });
  }

  public static toPersistence(patient: Patient): RawPatientProps {
    return {
      id: patient.id,
      name: patient.name.value,
      cpf: patient.cpf.value,
      phone: patient.phone.value,
      birthDate: patient.birthDate.value,
      createdAt: patient.createdAt,
    };
  }
}
