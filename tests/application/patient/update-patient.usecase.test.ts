import { Patient } from "@domain/patient/entities/patient.entity";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { UpdatePatientUseCase } from "@application/patient/update/update-patient.usecase";
import { PatientNotFoundError } from "@application/patient/shared/errors/patient-not-found.error";

describe("UpdatePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let updateUseCase: UpdatePatientUseCase;
  let patient: Patient;

  beforeEach(async () => {
    repo = new InMemoryPatientRepository();
    updateUseCase = new UpdatePatientUseCase(repo);
    patient = Patient.create({
      name: "João Silva",
      cpf: "933.444.130-58",
      phone: "(11) 99659-2439",
      birthDate: new Date("2000-01-01"),
    });
    await repo.save(patient);
  });

  it("Must update an existing patient", async () => {
    const updatedData = {
      id: patient.id,
      name: "Marcelo Silva",
      phone: "(11) 99661-3119",
      birthDate: "2020-01-01",
    };
    await updateUseCase.execute(updatedData);
    const result = await repo.findById(patient.id);
    expect(result?.name.value).toBe("Marcelo Silva");
  });

  it("Must throw PatientNotFound when trying to update a non existing patient", async () => {
    const ghost = {
      id: "123",
      name: "Fantasma",
      phone: "(11) 99659-2439",
      birthDate: "2000-01-01",
    };
    await expect(updateUseCase.execute(ghost)).rejects.toThrow(
      PatientNotFoundError,
    );
  });
});
