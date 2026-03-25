import { Patient } from "../entities/patient.entity";

export interface PatientRepository {
  save(patient: Patient): Promise<void>;

  findAll(): Promise<Patient[]>;

  findById(id: string): Promise<Patient | null>;

  delete(id: string): Promise<void>;
}
