import { Patient } from "@domain/patient/entities/patient.entity";
import { PatientMissingRequiredInformationError } from "@domain/patient/errors/patient-missing-required-information.error";

describe("Patient", () => {
  const validPatientData = {
    name: "João Silva",
    cpf: "933.444.130-58",
    phone: "(11) 99999-9999",
    birthDate: new Date("2000-01-01"),
  };

  it("should throw error if name is missing", () => {
    expect(() => Patient.create({ ...validPatientData, name: "" })).toThrow(
      PatientMissingRequiredInformationError,
    );
  });

  it("should throw error if cpf is missing", () => {
    expect(() => Patient.create({ ...validPatientData, cpf: "" })).toThrow(
      PatientMissingRequiredInformationError,
    );
  });

  it("should throw error if phone is missing", () => {
    expect(() => Patient.create({ ...validPatientData, phone: "" })).toThrow(
      PatientMissingRequiredInformationError,
    );
  });

  it("should throw error if birthDate is missing", () => {
    expect(() =>
      Patient.create({
        ...validPatientData,
        birthDate: undefined as unknown as Date,
      }),
    ).toThrow(PatientMissingRequiredInformationError);
  });

  it("should create a patient with valid data", () => {
    const patient = Patient.create(validPatientData);

    expect(patient.id).toBeDefined();
    expect(patient.name.value).toBe("João Silva");
    expect(patient.cpf.value).toBe("93344413058");
    expect(patient.phone.value).toBe("11999999999");
    expect(patient.birthDate.value).toEqual(new Date("2000-01-01"));
  });
});
