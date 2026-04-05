import { InvalidNameError } from "@domain/value-objects/errors/invalid-name.error";

export class Name {
  public readonly value: string;

  constructor(name: string) {
    this.value = Name.validate(name);
  }

  public static validate(name: string): string {
    const cleanedName = name.trim();
    const totalLength = cleanedName.length;

    if (!cleanedName || totalLength < 3) throw new InvalidNameError();

    if (totalLength > 150) {
      throw new InvalidNameError();
    }

    return name;
  }

  public getFirstName(): string {
    return this.value.split(" ")[0] ?? "";
  }

  public getLastName(): string {
    return this.value.split(" ").at(-1) ?? "";
  }
}
