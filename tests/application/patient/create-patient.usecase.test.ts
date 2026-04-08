import { CreatePatientUseCase } from "@application/patient/create/create-patient.usecase";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { InvalidCpfError } from "@domain/value-objects/errors/invalid-cpf.error";
import { InvalidBirthDateError } from "@domain/value-objects/errors/invalid-birth-date.error";

describe("CreatePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let useCase: CreatePatientUseCase;

  const validInput = {
    name: "João Silva",
    cpf: "529.982.247-25",
    phone: "(11) 99659-2439",
    birthDate: new Date("2020-01-01"),
  };

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    useCase = new CreatePatientUseCase(repo);
  });

  it("should create a patient successfully and return an id", async () => {
    const result = await useCase.execute(validInput);
    expect(result).toBeDefined();
    expect(typeof result.id).toBe("string");
  });

  it("should persist the patient in the repository", async () => {
    await useCase.execute(validInput);

    const patients = await repo.findAll();
    expect(patients).toHaveLength(1);
  });

  it("should return a complete PatientResponseDTO", async () => {
    const result = await useCase.execute(validInput);

    expect(result).toMatchObject({
      id: expect.any(String),
      name: "João Silva",
      cpf: expect.any(String),
      phone: expect.any(String),
      birthDate: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it("should not return domain entities or value objects", async () => {
    const result = await useCase.execute(validInput);

    expect(result).not.toBeInstanceOf(Patient);
    expect(typeof result.name).toBe("string");
    expect(typeof result.cpf).toBe("string");
  });

  it("should throw an error when trying to create a patient with an invalid CPF", async () => {
    const invalidInput = {
      ...validInput,
      cpf: "111.111.111-11",
    };

    await expect(useCase.execute(invalidInput)).rejects.toThrow(
      InvalidCpfError,
    );
  });

  it("should throw an error when trying to create a patient with a future birth date", async () => {
    const invalidInput = {
      ...validInput,
      birthDate: new Date(Date.now() + 1000 * 60 * 60),
    };

    await expect(useCase.execute(invalidInput)).rejects.toThrow(
      InvalidBirthDateError,
    );
  });
});
