import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

type PatientRow = {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  birthDate: Date;
  createdAt: Date;
};

export class InMemoryPatientRepository implements PatientRepository {
  private repo: PatientRow[] = [];

  public async save(patient: Patient): Promise<void> {
    const data: PatientRow = {
      id: patient.id,
      name: patient.name.value,
      phone: patient.phone.value,
      cpf: patient.cpf.value,
      birthDate: patient.birthDate.value,
      createdAt: patient.createdAt,
    };

    const index = this.repo.findIndex((p) => p.id === data.id);

    if (index === -1) this.repo.push(data);
    else throw new Error("Paciente já existe");
  }

  public async findAll(): Promise<Patient[]> {
    return this.repo.map((p) => this.toDomain(p));
  }

  public async findById(id: string): Promise<Patient | null> {
    const p = this.repo.find((p) => p.id === id);
    return p ? this.toDomain(p) : null;
  }

  public async update(patient: Patient): Promise<void> {
    const index = this.repo.findIndex((p) => p.id === patient.id);
    if (index === -1) throw new Error("Paciente não encontrado");
    this.repo.splice(index, 1, {
      id: patient.id,
      name: patient.name.value,
      phone: patient.phone.value,
      cpf: patient.cpf.value,
      birthDate: patient.birthDate.value,
      createdAt: patient.createdAt,
    });
  }

  public async delete(id: string): Promise<void> {
    this.repo = this.repo.filter((p) => p.id !== id);
  }

  private toDomain(p: PatientRow): Patient {
    return Patient.reconstitute({
      id: p.id,
      name: new Name(p.name),
      cpf: new Cpf(p.cpf),
      phone: new Phone(p.phone),
      birthDate: new BirthDate(p.birthDate),
      createdAt: p.createdAt,
    });
  }
}
