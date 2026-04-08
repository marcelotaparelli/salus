import { BirthDate } from "@domain/value-objects/birth-date.vo";
import { InvalidBirthDateError } from "@domain/value-objects/errors/invalid-birth-date.error";

describe("BirthDate value object", () => {
  it("should returns InvalidBirthDateError if argument is not of type Date", () => {
    expect(() => new BirthDate("2001-01-01" as unknown as Date)).toThrow(
      InvalidBirthDateError,
    );
  });

  it("should return InvalidBirthDateError if argument has wrong typed Date", () => {
    expect(
      () => new BirthDate("July 20, 69 20:1 GMT+00:00" as unknown as Date),
    ).toThrow(InvalidBirthDateError);
  });

  it("should return InvalidBirthDateError if argument is a future Date", () => {
    expect(() => new BirthDate(new Date(2027, 2, 10))).toThrow(
      InvalidBirthDateError,
    );
  });

  it("should return InvalidBirthDateError if argument year is less then 1900", () => {
    expect(() => new BirthDate(new Date(1899, 1, 1))).toThrow(
      InvalidBirthDateError,
    );
  });

  it("should return date in string format", () => {
    const birthdate = new BirthDate(new Date(2020, 0, 1));
    expect(birthdate.toString()).toBe("01/01/2020");
  });

  it("should return the date in Date format", () => {
    const birthdate = new BirthDate(new Date(2020, 1, 1));
    expect(birthdate.toDate()).toEqual(new Date(2020, 1, 1));
  });

  it("should accept today's date", () => {
    expect(() => new BirthDate(new Date())).not.toThrow();
  });

  it("should not expose a mutable reference", () => {
    const birthdate = new BirthDate(new Date(2020, 1, 1));
    const ref = birthdate.toDate();
    ref.setFullYear(1800);
    expect(birthdate.toDate().getFullYear()).toBe(2020);
  });
});
