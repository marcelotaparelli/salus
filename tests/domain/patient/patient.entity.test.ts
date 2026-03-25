import { Patient } from "@domain/patient/entities/patient.entity";
import { Name } from "@domain/value-objects/name.vo";
import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

describe("Patient", () => {
  it("Deve criar um paciente com os dados corretos", () => {
    const patient = Patient.create(
      new Name("João Silva"),
      new Cpf("933.444.130-58"),
      new Phone("(11) 99999-9999"),
      new BirthDate(new Date("2000-01-01")),
    );

    expect(patient.id).toBeDefined();
    expect(patient.name.value).toBe("João Silva");
    expect(patient.cpf.value).toBe("93344413058");
    expect(patient.phone.value).toBe("11999999999");
    expect(patient.birthDate.value).toEqual(new Date("2000-01-01"));
  });
});
