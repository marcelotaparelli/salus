import { Patient } from "@domain/patient/entities/patient.entity";

describe("Patient", () => {
  it("Deve criar um paciente com os dados corretos", () => {
    const patient = Patient.create({
      name: "João Silva",
      cpf: "933.444.130-58",
      phone: "(11) 99999-9999",
      birthDate: new Date("2000-01-01"),
    });

    expect(patient.id).toBeDefined();
    expect(patient.name.value).toBe("João Silva");
    expect(patient.cpf.value).toBe("93344413058");
    expect(patient.phone.value).toBe("11999999999");
    expect(patient.birthDate.value).toEqual(new Date("2000-01-01"));
  });
});
