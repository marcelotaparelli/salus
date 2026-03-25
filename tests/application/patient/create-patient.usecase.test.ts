import { CreatePatientUseCase } from "@application/patient/create/create-patient.usecase";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

describe("CreatePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let useCase: CreatePatientUseCase;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    useCase = new CreatePatientUseCase(repo);
  });

  it("Deve retornar um paciente com id", async () => {
    const rawPatientData = {
      name: new Name("João Silva"),
      cpf: new Cpf("529.982.247-25"),
      phone: new Phone("(11) 99659-2439"),
      birthDate: new BirthDate(new Date("2020-01-01")),
    };
    const result = await useCase.execute(rawPatientData);
    expect(result.id).toBeDefined();
  });
});
