import { CreatePatientUseCase } from "@application/patient/create-patient.usecase";
import { InMemoryPatientRepository } from "../../infra/database/in-memory/patient.repository";

describe("CreatePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let useCase: CreatePatientUseCase;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    useCase = new CreatePatientUseCase(repo);
  });

  it("Deve retornar um paciente com id", async () => {
    const rawPatientData = {
      name: "João Silva",
      cpf: "933.444.130-58",
      phone: "1199999999",
      birthDate: new Date("2020-01-01"),
    };
    const result = await useCase.execute(rawPatientData);
    expect(result.id).toBeDefined();
  });
});
