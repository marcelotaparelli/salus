import { InMemoryPatientRepository } from "../../infra/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/patient.entity";
import { DeletePatientUseCase } from "@application/patient/delete-patient.usecase";

describe("DeletePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let deleteUseCase: DeletePatientUseCase;

  beforeEach(async () => {
    repo = new InMemoryPatientRepository();
    deleteUseCase = new DeletePatientUseCase(repo);
    patient = Patient.create(
      "João Silva",
      "933.444.130-58",
      "1199999999",
      new Date("2000-01-01"),
    );
    await repo.save(patient);
  });

  it("Deve deletar um paciente", async () => {
    await deleteUseCase.execute(patient.id);
    const result = await repo.findById(patient.id);
    expect(result).toBeNull();
  });

  it("Deve retornar erro quando paciente não existir", async () => {
    await expect(deleteUseCase.execute("id-inexistente")).rejects.toThrow(
      "Paciente não encontrado",
    );
  });
});
