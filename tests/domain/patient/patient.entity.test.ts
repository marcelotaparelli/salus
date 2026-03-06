import { Patient } from "@domain/patient/patient.entity";

describe("Patient", () => {
  it("Deve criar um paciente com os dados corretos", () => {
    const patient = new Patient(
      "123",
      "João Silva",
      "1199999999",
      new Date("2000-01-01"),
    );

    expect(patient.id).toBe("123");
    expect(patient.name).toBe("João Silva");
    expect(patient.phone).toBe("1199999999");
    expect(patient.birthDate).toEqual(new Date("2000-01-01"));
  });
});
