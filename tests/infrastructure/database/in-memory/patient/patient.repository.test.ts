import { InMemoryPatientRepository } from "./patient.repository";
import { Patient } from "@domain/patient/entities/patient.entity";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

describe("InMemoryPatientRepository", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let patient2: Patient;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    patient = new Patient(
      "123",
      new Name("João Silva"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 91234-5678"),
      new BirthDate(new Date("2000-01-01")),
    );
    patient2 = new Patient(
      "124",
      new Name("Maria Silva"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 91234-5678"),
      new BirthDate(new Date("2000-01-01")),
    );
  });

  it("Save deve adicionar um paciente em memória", async () => {
    await repo.save(patient);

    const response = await repo.findById("123");

    expect(response).toEqual(patient);
  });

  it("Save deve atualizar um paciente caso já existir em memória", async () => {
    await repo.save(patient);

    const updatedPatient = new Patient(
      "123",
      new Name("Marcelo"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 91234-5678"),
      new BirthDate(new Date("2000-01-01")),
    );

    await repo.save(updatedPatient);

    const response = await repo.findById("123");

    expect(response).toStrictEqual(updatedPatient);
  });

  it("FindAll deve retornar array vazio quando não encontrar nenhum paciente", async () => {
    const response = await repo.findAll();

    expect(response).toHaveLength(0);
  });

  it("FindAll deve retornar todos os pacientes em memoria", async () => {
    await repo.save(patient);
    await repo.save(patient2);

    const response = await repo.findAll();

    expect(response).toHaveLength(2);
  });

  it("FindById deve retornar null quando não encontrar paciente", async () => {
    const response = await repo.findById("123");

    expect(response).toBeNull();
  });

  it("FindById deve retornar o paciente equivalente ao id passado", async () => {
    await repo.save(patient);
    await repo.save(patient2);

    const response = await repo.findById("123");

    expect(response).toEqual(patient);
  });

  it("Delete deve remover paciente da memória", async () => {
    await repo.save(patient);
    await repo.save(patient2);

    await repo.delete("123");

    const response = await repo.findById("124");

    expect(response).toEqual(patient2);
  });
});
