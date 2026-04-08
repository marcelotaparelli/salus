import { InvalidEmailError } from "@domain/value-objects/errors/invalid-email.error";
import { Email } from "@domain/value-objects";

describe("Email value object", () => {
  it("should throw InvalidEmailError when email is empty", () => {
    expect(() => new Email("")).toThrow(InvalidEmailError);
  });

  it("should throw InvalidEmailError when email has invalid format", () => {
    expect(() => new Email("invalid-email")).toThrow(InvalidEmailError);
    expect(() => new Email("user@domain")).toThrow(InvalidEmailError);
    expect(() => new Email("user@.com")).toThrow(InvalidEmailError);
    expect(() => new Email("user@domain..com")).toThrow(InvalidEmailError);
  });

  it("should throw InvalidEmailError when email length exceeds 255 characters", () => {
    const longEmail = "a".repeat(250) + "@test.com";
    expect(() => new Email(longEmail)).toThrow(InvalidEmailError);
  });

  it("should clean spaces and lowercase the email", () => {
    const email = new Email("   User@Domain.COM   ");
    expect(email.value).toEqual("user@domain.com");
  });

  it("should accept a valid email", () => {
    const email = new Email("user@example.com");
    expect(email.value).toEqual("user@example.com");
  });

  it("should return cleaned email", () => {
    const validated = Email.validate("  TEST@Example.Com ");
    expect(validated).toEqual("test@example.com");
  });
});
