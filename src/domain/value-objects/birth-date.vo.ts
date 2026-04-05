import { InvalidBirthDateError } from "@domain/value-objects/errors/invalid-birth-date.error";

export class BirthDate {
  public readonly value: Date;

  constructor(birthDate: Date) {
    this.value = BirthDate.validate(birthDate);
  }

  private static validate(date: Date): Date {
    if (!(date instanceof Date) || isNaN(date.getTime()))
      throw new InvalidBirthDateError();

    const today = new Date();

    if (date > today) throw new InvalidBirthDateError();

    if (date.getFullYear() < 1900) throw new InvalidBirthDateError();

    return date;
  }

  public toString(): string {
    const day = String(this.value.getDate()).padStart(2, "0");
    const month = String(this.value.getMonth() + 1).padStart(2, "0");
    const year = String(this.value.getFullYear());

    return `${day}/${month}/${year}`;
  }

  public toDate(): Date {
    return new Date(this.value);
  }
}
