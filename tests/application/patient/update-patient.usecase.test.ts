import { Patient } from "@domain/patient/entities/patient.entity";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { UpdatePatientUseCase } from "@application/patient/update/update-patient.usecase";
import { Name } from "@domain/value-objects/name.vo";

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

  it("deve atualizar um paciente", async () => {
    const updatedPatient = Patient.reconstitute({
      id: patient.id,
      name: new Name("Marcelo Silva"),
      cpf: patient.cpf,
      phone: patient.phone,
      birthDate: patient.birthDate,
      createdAt: patient.createdAt,
    });
    await updateUseCase.execute(updatedPatient);
    const result = await repo.findById(patient.id);
    expect(result?.name.value).toBe("Marcelo Silva");
  });

  it("deve lançar erro ao atualizar paciente inexistente", async () => {
    const ghost = Patient.create({
      name: "Fantasma",
      cpf: "933.444.130-58",
      phone: "(11) 99659-2439",
      birthDate: new Date("2000-01-01"),
    });
    await expect(updateUseCase.execute(ghost)).rejects.toThrow(
      "Paciente não encontrado",
    );
  });
});
