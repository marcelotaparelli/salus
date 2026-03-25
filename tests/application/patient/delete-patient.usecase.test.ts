import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { DeletePatientUseCase } from "@application/patient/delete/delete-patient.usecase";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

describe("DeletePatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let deleteUseCase: DeletePatientUseCase;

  beforeEach(async () => {
    repo = new InMemoryPatientRepository();
    deleteUseCase = new DeletePatientUseCase(repo);
    patient = Patient.create(
      new Name("João Silva"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 99659-2439"),
      new BirthDate(new Date("2000-01-01")),
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
