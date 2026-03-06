import { InMemoryPatientRepository } from "./patient.repository";
import { Patient } from "@domain/patient/patient.entity";

describe("InMemoryPatientRepository", () => {
  let repo: InMemoryPatientRepository;
  let patient: Patient;
  let patient2: Patient;

  beforeEach(() => {
    repo = new InMemoryPatientRepository();
    patient = new Patient(
      "123",
      "João Silva",
      "1199999999",
      new Date("2000-01-01"),
    );
    patient2 = new Patient(
      "124",
      "Maria Silva",
      "1199999999",
      new Date("2000-01-01"),
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
      "Marcelo",
      "1199999999",
      new Date("2000-01-01"),
    );

    await repo.save(updatedPatient);

    const response = await repo.findById("123");

    expect(response).toBe(updatedPatient);
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
