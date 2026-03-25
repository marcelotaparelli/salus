import { ListPatientsUseCase } from "@application/patient/list/list-patients.usecase";
import { CreatePatientUseCase } from "@application/patient/create/create-patient.usecase";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

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
      new Name("João Silva"),
      new Cpf("529.982.247-25"),
      new Phone("(11) 99659-2439"),
      new BirthDate(new Date("2000-01-01")),
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
