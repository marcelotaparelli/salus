import { Patient } from "@domain/patient/patient.entity";
import type { PatientRepository } from "@domain/patient/patient.repository";

export class InMemoryPatientRepository implements PatientRepository {
  private patients: Patient[] = [];

  async save(patient: Patient): Promise<void> {
    const index = this.patients.findIndex((p) => p.id === patient.id);

    if (index >= 0) {
      this.patients[index] = patient;
    } else {
      this.patients.push(patient);
    }
  }

  async findAll(): Promise<Patient[]> {
    return this.patients;
  }

  async findById(id: string): Promise<Patient | null> {
    return this.patients.find((p) => p.id === id) ?? null;
  }

  async delete(id: string): Promise<void> {
    this.patients = this.patients.filter((p) => p.id !== id);
  }
}
