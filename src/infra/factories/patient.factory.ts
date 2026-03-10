import { PrismaPatientRepository } from "@infra/database/prisma/patient.repository";
import { CreatePatientUseCase } from "@application/patient/create-patient.usecase";
import { GetPatientUseCase } from "@application/patient/get-patient.usecase";
import { ListPatientsUseCase } from "@application/patient/list-patients.usecase";
import { UpdatePatientUseCase } from "@application/patient/update-patient.usecase";
import { DeletePatientUseCase } from "@application/patient/delete-patient.usecase";

const repository = new PrismaPatientRepository();

export function makePatientUseCases() {
  const createUseCase = new CreatePatientUseCase(repository);
  const getUseCase = new GetPatientUseCase(repository);
  const listUseCase = new ListPatientsUseCase(repository);
  const updateUseCase = new UpdatePatientUseCase(repository);
  const deleteUseCase = new DeletePatientUseCase(repository);
  return {
    createUseCase,
    getUseCase,
    listUseCase,
    updateUseCase,
    deleteUseCase,
  };
}
