import { ListPatientsUseCase } from "@application/patient/list/list-patients.usecase";
import { CreatePatientUseCase } from "@application/patient/create/create-patient.usecase";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";

describe("ListPatientsUseCase", () => {
  let repo: InMemoryPatientRepository;
  let listUseCase: ListPatientsUseCase;
  let createUseCase: CreatePatientUseCase;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    listUseCase = new ListPatientsUseCase(repo);
    createUseCase = new CreatePatientUseCase(repo);
  });

  it("should list all patients", async () => {
    await createUseCase.execute({
      name: "João Silva",
      cpf: "529.982.247-25",
      phone: "(11) 99659-2439",
      birthDate: new Date("2000-01-01"),
    });
    const patientList = await listUseCase.execute();
    expect(patientList).toHaveLength(1);
    const first = patientList[0]!;
    expect(first).toBeDefined();
    expect(typeof first.name).toBe("string");
    expect(first.cpf).toBe("529.982.247-25");
  });

  it("should return an empty array", async () => {
    const patientList = await listUseCase.execute();
    expect(patientList).toEqual([]);
  });
});
