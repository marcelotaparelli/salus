import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { prisma } from "../prisma/client";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

export class PrismaPatientRepository implements PatientRepository {
  async save(patient: Patient): Promise<void> {
    await prisma.patient.create({
      data: {
        id: patient.id,
        name: patient.name.value,
        cpf: patient.cpf.value,
        phone: patient.phone.value,
        birthDate: patient.birthDate.value,
      },
    });
  }

  async findAll(): Promise<Patient[]> {
    const result = await prisma.patient.findMany();
    return result.map((p) =>
      Patient.reconstitute({
        id: p.id,
        name: new Name(p.name),
        cpf: new Cpf(p.cpf),
        phone: new Phone(p.phone),
        birthDate: new BirthDate(p.birthDate),
        createdAt: p.createdAt,
      }),
    );
  }

  async findById(id: string): Promise<Patient | null> {
    const result = await prisma.patient.findUnique({
      where: { id: id },
    });
    if (!result) return null;
    return Patient.reconstitute({
      id: result.id,
      name: new Name(result.name),
      cpf: new Cpf(result.cpf),
      phone: new Phone(result.phone),
      birthDate: new BirthDate(result.birthDate),
      createdAt: result.createdAt,
    });
  }

  async update(patient: Patient): Promise<void> {
    await prisma.patient.update({
      where: { id: patient.id },
      data: {
        name: patient.name.value,
        phone: patient.phone.value,
        birthDate: patient.birthDate.value,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.patient.delete({
      where: { id },
    });
  }
}
