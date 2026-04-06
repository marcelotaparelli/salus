import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { prisma } from "../prisma/client";
import { PatientMapper } from "@infra/mappers/patient-persistence.mapper";

export class PrismaPatientRepository implements PatientRepository {
  async save(patient: Patient): Promise<void> {
    const toPersistencePatient = PatientMapper.toPersistence(patient);
    await prisma.patient.create({ data: toPersistencePatient });
  }

  async findAll(): Promise<Patient[]> {
    const result = await prisma.patient.findMany();
    return result.map(PatientMapper.toDomain);
  }

  async findById(id: string): Promise<Patient | null> {
    const result = await prisma.patient.findUnique({
      where: { id: id },
    });
    if (!result) return null;
    return PatientMapper.toDomain(result);
  }

  async update(patient: Patient): Promise<void> {
    const toPersistencePatient = PatientMapper.toPersistence(patient);
    await prisma.patient.update({
      where: { id: patient.id },
      data: {
        name: toPersistencePatient.name,
        phone: toPersistencePatient.phone,
        birthDate: toPersistencePatient.birthDate,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.patient.delete({
      where: { id },
    });
  }
}
