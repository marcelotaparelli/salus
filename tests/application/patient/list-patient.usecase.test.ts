import { ListPatientsUseCase } from "@application/patient/list-patients.usecase";
import { CreatePatientUseCase } from "@application/patient/create-patient.usecase";
import { InMemoryPatientRepository } from "../../infra/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/patient.entity";

describe("ListPatientsUseCase", () => {
  let repo: InMemoryPatientRepository;
  let listUseCase: ListPatientsUseCase;
  let createUseCase: CreatePatientUseCase;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    listUseCase = new ListPatientsUseCase(repo);
    createUseCase = new CreatePatientUseCase(repo);
  });

  it("Deve listar todos os pacientes", async () => {
    const patient = Patient.create(
      "João Silva",
      "933.444.130-58",
      "1199999999",
      new Date("2000-01-01"),
    );
    await createUseCase.execute(patient);
    const patientList = await listUseCase.execute();
    expect(patientList).toHaveLength(1);
  });

  it("Deve retornar um array vazio caso não existir registros", async () => {
    const patientList = await listUseCase.execute();
    expect(patientList).toEqual([]);
  });
});
