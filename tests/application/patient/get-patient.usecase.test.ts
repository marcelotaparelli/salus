import { InMemoryPatientRepository } from "../../infra/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/patient.entity";
import { GetPatientUseCase } from "@application/patient/get-patient.usecase";

describe("GetPatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let getUseCase: GetPatientUseCase;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    getUseCase = new GetPatientUseCase(repo);
    patient = Patient.create(
      "João Silva",
      "933.444.130-58",
      "1199999999",
      new Date("2000-01-01"),
    );
  });

  it("Deve retornar null quando paciente não existe", async () => {
    const foundPatient = await getUseCase.execute(patient.id);
    expect(foundPatient).toBeNull();
  });

  it("Deve retornar um paciente", async () => {
    await repo.save(patient);
    const foundPatient = await getUseCase.execute(patient.id);
    expect(foundPatient).toBe(patient);
  });
});
