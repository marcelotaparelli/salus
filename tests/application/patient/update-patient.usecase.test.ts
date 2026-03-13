import { Patient } from "@domain/patient/patient.entity";
import { InMemoryPatientRepository } from "../../infra/database/in-memory/patient/patient.repository";
import { UpdatePatientUseCase } from "@application/patient/update-patient.usecase";

describe("UpdatePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let updateUseCase: UpdatePatientUseCase;
  let patient: Patient;

  beforeEach(async () => {
    repo = new InMemoryPatientRepository();
    updateUseCase = new UpdatePatientUseCase(repo);
    patient = Patient.create(
      "João Silva",
      "933.444.130-58",
      "1199999999",
      new Date("2000-01-01"),
    );
    await repo.save(patient);
  });

  it("deve atualizar um paciente", async () => {
    const updatedPatient = new Patient(
      patient.id,
      "Marcelo Silva",
      "933.444.130-58",
      "1199999999",
      new Date("2000-01-01"),
    );
    await updateUseCase.execute(updatedPatient);
    const result = await repo.findById(patient.id);
    expect(result?.name).toBe("Marcelo Silva");
  });

  it("deve lançar erro ao atualizar paciente inexistente", async () => {
    const ghost = Patient.create(
      "Fantasma",
      "933.444.130-58",
      "1199999999",
      new Date("2000-01-01"),
    );
    await expect(updateUseCase.execute(ghost)).rejects.toThrow(
      "Paciente não encontrado",
    );
  });
});
