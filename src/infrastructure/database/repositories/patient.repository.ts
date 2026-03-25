import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { prisma } from "../prisma/client";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

export class PrismaPatientRepository implements PatientRepository {
  async save(patient: Patient): Promise<void> {
    await prisma.patient.upsert({
      where: { id: patient.id },
      create: {
        id: patient.id,
        name: patient.name.value,
        cpf: patient.cpf.value,
        phone: patient.phone.value,
        birthDate: patient.birthDate.value,
      },
      update: {
        name: patient.name.value,
        cpf: patient.cpf.value,
        phone: patient.phone.value,
        birthDate: patient.birthDate.value,
      },
    });
  }

  async findAll(): Promise<Patient[]> {
    const result = await prisma.patient.findMany();
    return result.map(
      (p) =>
        new Patient(
          p.id,
          new Name(p.name),
          new Cpf(p.cpf),
          new Phone(p.phone),
          new BirthDate(p.birthDate),
          p.createdAt,
        ),
    );
  }

  async findById(id: string): Promise<Patient | null> {
    const result = await prisma.patient.findUnique({
      where: { id: id },
    });
    if (!result) return null;
    return new Patient(
      result.id,
      new Name(result.name),
      new Cpf(result.cpf),
      new Phone(result.phone),
      new BirthDate(result.birthDate),
      result.createdAt,
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.patient.delete({
      where: { id },
    });
  }
}
