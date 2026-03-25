import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { PrismaPatientRepository } from "@infra/database/repositories/patient.repository";
import { CreatePatientUseCase } from "@application/patient/create/create-patient.usecase";
import { GetPatientUseCase } from "@application/patient/get/get-patient.usecase";
import { ListPatientsUseCase } from "@application/patient/list/list-patients.usecase";
import { UpdatePatientUseCase } from "@application/patient/update/update-patient.usecase";
import { DeletePatientUseCase } from "@application/patient/delete/delete-patient.usecase";

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
