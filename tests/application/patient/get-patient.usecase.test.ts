import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { GetPatientUseCase } from "@application/patient/get/get-patient.usecase";
import { PatientNotFoundError } from "@application/patient/shared/errors/patient-not-found.error";

describe("GetPatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let getUseCase: GetPatientUseCase;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    getUseCase = new GetPatientUseCase(repo);
    patient = Patient.create({
      name: "João Silva",
      cpf: "933.444.130-58",
      phone: "(11) 99659-2439",
      birthDate: new Date("2000-01-01"),
    });
  });

  it("should throw PatientNotFoundError when patient is not found", async () => {
    await expect(getUseCase.execute(patient.id)).rejects.toThrow(
      PatientNotFoundError,
    );
  });

  it("should return a patient", async () => {
    await repo.save(patient);
    const result = await getUseCase.execute(patient.id);

    expect(result).not.toBeNull();
    expect(result?.id).toBeDefined();
    expect(result?.createdAt.substring(0, 10)).toEqual(
      new Date().toISOString().substring(0, 10),
    );
    expect(result?.name).toBe("João Silva");
    expect(result?.cpf).toBe("933.444.130-58");
    expect(result?.phone).toBe("(11) 99659-2439");
    expect(result?.birthDate).toEqual(new Date("2000-01-01").toISOString());
  });
});
