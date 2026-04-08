import { InvalidCpfError } from "@domain/value-objects/errors/invalid-cpf.error";
import { Cpf } from "@domain/value-objects";

describe("Cpf value objects", () => {
  it("should return InvalidCpfError when length is different from 11", () => {
    expect(() => new Cpf("213.304.555-0")).toThrow(InvalidCpfError);
  });

  it("should return InvalidCpfError when all digits are equal", () => {
    expect(() => new Cpf("111.111.111-11")).toThrow(InvalidCpfError);
  });

  it("should return InvalidCpfError when last digits are invalid", () => {
    expect(() => new Cpf("243.451.522-44")).toThrow(InvalidCpfError);
  });

  it("should return a cleaned or formatted cpf", () => {
    const cpf = new Cpf("167.038.460-81");
    const stringCpf = cpf.toString();
    expect(stringCpf).toEqual("16703846081");
    const formattedCpf = cpf.format();
    expect(formattedCpf).toEqual("167.038.460-81");
  });

  it("should return true for a valid CPF", () => {
    expect(Cpf.isValid("16703846081")).toBe(true);
  });

  it("should clean non-digit characters", () => {
    const cpf = new Cpf("167.038.460-81");
    expect(cpf.value).toEqual("16703846081");
  });
});
