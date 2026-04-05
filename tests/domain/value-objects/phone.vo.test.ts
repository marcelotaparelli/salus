import { Phone } from "@domain/value-objects/phone.vo";
import { InvalidPhoneError } from "@domain/value-objects/errors/invalid-phone.error";

describe("Phone value object", () => {
  it("Deve retornar erro de validação se phone < 11", () => {
    expect(() => new Phone("(19)99878-768")).toThrow(InvalidPhoneError);
  });

  it("Deve retornar erro de validação se phone > 11", () => {
    expect(() => new Phone("(19)99878-76800")).toThrow(InvalidPhoneError);
  });

  it("Deve retornar erro de validação 3 digito não for 9", () => {
    expect(() => new Phone("(19)39878-7680")).toThrow(InvalidPhoneError);
  });

  it("Deve retornar erro de validação se digitos forem iguais", () => {
    expect(() => new Phone("(11)11111-1111")).toThrow(InvalidPhoneError);
  });

  it("Must return unformatted string", () => {
    const phone = new Phone("(19) 99659-2477");
    expect(phone.toString()).toBe("19996592477");
  });

  it("Must return formatted string", () => {
    const phone = new Phone("(19) 99659-2477");
    expect(phone.format()).toBe("(19) 99659-2477");
  });
});
