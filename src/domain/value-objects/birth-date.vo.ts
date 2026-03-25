export class BirthDate {
  public readonly value: Date;

  constructor(birthDate: Date) {
    this.value = BirthDate.validate(birthDate);
  }

  private static validate(date: Date): Date {
    if (!(date instanceof Date) || isNaN(date.getTime()))
      throw new Error("Data inválida");

    const today = new Date();

    if (date > today) throw new Error("Data de nascimento não pode ser futura");

    if (date.getFullYear() < 1900)
      throw new Error("Data de nascimento muito antiga");

    return date;
  }

  public toString(): string {
    const day = String(this.value.getDate()).padStart(2, "0");
    const month = String(this.value.getMonth() + 1).padStart(2, "0");
    const year = String(this.value.getFullYear());

    return `${day}/${month}/${year}`;
  }

  public toDate(): Date {
    return this.value;
  }
}
