import { PatientRepository } from "@domain/patient/patient.repository";
import { Patient } from "@domain/patient/patient.entity";
import { prisma } from "./client";

export class PrismaPatientRepository implements PatientRepository {
  async save(patient: Patient): Promise<void> {
    await prisma.patient.upsert({
      where: { id: patient.id },
      create: {
        id: patient.id,
        name: patient.name,
        cpf: patient.cpf,
        phone: patient.phone,
        birthDate: patient.birthDate,
      },
      update: {
        name: patient.name,
        cpf: patient.cpf,
        phone: patient.phone,
        birthDate: patient.birthDate,
      },
    });
  }

  async findAll(): Promise<Patient[]> {
    const result = await prisma.patient.findMany();
    return result.map(
      (p) =>
        new Patient(p.id, p.name, p.cpf, p.phone, p.birthDate, p.createdAt),
    );
  }

  async findById(id: string): Promise<Patient | null> {
    const result = await prisma.patient.findUnique({
      where: { id: id },
    });
    if (!result) return null;
    return new Patient(
      result.id,
      result.name,
      result.cpf,
      result.phone,
      result.birthDate,
      result.createdAt,
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.patient.delete({
      where: { id },
    });
  }
}
