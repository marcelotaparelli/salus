import { Phone } from "@domain/value-objects/phone.vo";
import { InvalidPhoneError } from "@domain/value-objects/errors/invalid-phone.error";

describe("Phone value object", () => {
  it("should throw validation error if phone has less than 11 digits", () => {
    expect(() => new Phone("(19)99878-768")).toThrow(InvalidPhoneError);
  });

  it("should throw validation error if phone has more than 11 digits", () => {
    expect(() => new Phone("(19)99878-76800")).toThrow(InvalidPhoneError);
  });

  it("should throw validation error if the third digit is not 9", () => {
    expect(() => new Phone("(19)39878-7680")).toThrow(InvalidPhoneError);
  });

  it("should throw validation error if all digits are the same", () => {
    expect(() => new Phone("(11)11111-1111")).toThrow(InvalidPhoneError);
  });

  it("should return unformatted string", () => {
    const phone = new Phone("(19) 99659-2477");
    expect(phone.toString()).toBe("19996592477");
  });

  it("should return formatted string", () => {
    const phone = new Phone("(19) 99659-2477");
    expect(phone.format()).toBe("(19) 99659-2477");
  });
});
