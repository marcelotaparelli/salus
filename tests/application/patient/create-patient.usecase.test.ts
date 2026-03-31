import { CreatePatientUseCase } from "@application/patient/create/create-patient.usecase";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";

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
      cpf: "529.982.247-25",
      phone: "(11) 99659-2439",
      birthDate: new Date("2020-01-01"),
    };
    const result = await useCase.execute(rawPatientData);
    expect(result.id).toBeDefined();
  });
});
