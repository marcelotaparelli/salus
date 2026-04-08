import { Name } from "@domain/value-objects/name.vo";
import { InvalidNameError } from "@domain/value-objects/errors/invalid-name.error";

describe("Name value object", () => {
  let name: Name;

  beforeEach(() => {
    name = new Name("Marcelo Taparelli");
  });

  it("should throw validation error if name is empty", () => {
    expect(() => new Name("")).toThrow(InvalidNameError);
  });

  it("should throw validation error if name is shorter than 3 characters", () => {
    expect(() => new Name("Ma")).toThrow(InvalidNameError);
  });

  it("should throw validation error if name is longer than 150 characters", () => {
    expect(() => new Name("a".repeat(151))).toThrow(InvalidNameError);
  });

  it("should validate correct names", () => {
    expect(name.value).toBe("Marcelo Taparelli");
  });

  it("should return the first name", () => {
    expect(name.getFirstName()).toBe("Marcelo");
  });

  it("should return the last name", () => {
    expect(name.getLastName()).toBe("Taparelli");
  });
});
