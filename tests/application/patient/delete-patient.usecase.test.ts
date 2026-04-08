import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { DeletePatientUseCase } from "@application/patient/delete/delete-patient.usecase";
import { PatientNotFoundError } from "@application/patient/shared/errors/patient-not-found.error";

describe("DeletePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let deleteUseCase: DeletePatientUseCase;

  beforeEach(async () => {
    repo = new InMemoryPatientRepository();
    deleteUseCase = new DeletePatientUseCase(repo);
    patient = Patient.create({
      name: "João Silva",
      cpf: "933.444.130-58",
      phone: "(11) 99659-2439",
      birthDate: new Date("2000-01-01"),
    });
    await repo.save(patient);
  });

  it("should delete a patient", async () => {
    await deleteUseCase.execute(patient.id);
    const result = await repo.findById(patient.id);
    expect(result).toBeNull();
  });

  it("should return PatientNotFound when non existing patient", async () => {
    await expect(deleteUseCase.execute("id-inexistente")).rejects.toThrow(
      PatientNotFoundError,
    );
  });
});
