import { Patient } from "@domain/patient/entities/patient.entity";
import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { UpdatePatientUseCase } from "@application/patient/update/update-patient.usecase";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

describe("UpdatePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let updateUseCase: UpdatePatientUseCase;
  let patient: Patient;

  beforeEach(async () => {
    repo = new InMemoryPatientRepository();
    updateUseCase = new UpdatePatientUseCase(repo);
    patient = Patient.create(
      new Name("João Silva"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 99659-2439"),
      new BirthDate(new Date("2000-01-01")),
    );
    await repo.save(patient);
  });

  it("deve atualizar um paciente", async () => {
    const updatedPatient = new Patient(
      patient.id,
      new Name("Marcelo Silva"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 99659-2439"),
      new BirthDate(new Date("2000-01-01")),
    );
    await updateUseCase.execute(updatedPatient);
    const result = await repo.findById(patient.id);
    expect(result?.name.value).toBe("Marcelo Silva");
  });

  it("deve lançar erro ao atualizar paciente inexistente", async () => {
    const ghost = Patient.create(
      new Name("Fantasma"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 99659-2439"),
      new BirthDate(new Date("2000-01-01")),
    );
    await expect(updateUseCase.execute(ghost)).rejects.toThrow(
      "Paciente não encontrado",
    );
  });
});
