import { InMemoryPatientRepository } from "../../infrastructure/database/in-memory/patient/patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { GetPatientUseCase } from "@application/patient/get/get-patient.usecase";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

describe("GetPatientUseCase", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let getUseCase: GetPatientUseCase;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    getUseCase = new GetPatientUseCase(repo);
    patient = Patient.create(
      new Name("João Silva"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 99659-2439"),
      new BirthDate(new Date("2000-01-01")),
    );
  });

  it("Deve retornar null quando paciente não existe", async () => {
    const foundPatient = await getUseCase.execute(patient.id);
    expect(foundPatient).toBeNull();
  });

  it("Deve retornar um paciente", async () => {
    await repo.save(patient);
    const foundPatient = await getUseCase.execute(patient.id);
    expect(foundPatient).toStrictEqual(patient);
  });
});
