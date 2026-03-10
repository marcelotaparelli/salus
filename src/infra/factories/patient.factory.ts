import { PatientRepository } from "@domain/patient/patient.repository";
import { PrismaPatientRepository } from "@infra/database/prisma/patient.repository";
import { CreatePatientUseCase } from "@application/patient/create-patient.usecase";
import { GetPatientUseCase } from "@application/patient/get-patient.usecase";
import { ListPatientsUseCase } from "@application/patient/list-patients.usecase";
import { UpdatePatientUseCase } from "@application/patient/update-patient.usecase";
import { DeletePatientUseCase } from "@application/patient/delete-patient.usecase";

export function makePatientUseCases(repository?: PatientRepository) {
  const repo = repository ?? new PrismaPatientRepository();

  const createUseCase = new CreatePatientUseCase(repo);
  const getUseCase = new GetPatientUseCase(repo);
  const listUseCase = new ListPatientsUseCase(repo);
  const updateUseCase = new UpdatePatientUseCase(repo);
  const deleteUseCase = new DeletePatientUseCase(repo);
  return {
    createUseCase,
    getUseCase,
    listUseCase,
    updateUseCase,
    deleteUseCase,
  };
}
