import { Patient } from "../entities/patient.entity";

export interface PatientRepository {
  save(patient: Patient): Promise<void>;

  findAll(): Promise<Patient[]>;

  findById(id: string): Promise<Patient | null>;

  update(patient: Patient): Promise<void>;

  delete(id: string): Promise<void>;
}
