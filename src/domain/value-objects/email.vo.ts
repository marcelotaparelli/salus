import { InvalidEmailError } from "@domain/value-objects/errors/invalid-email.error";

export class Email {
  public readonly value: string;

  constructor(email: string) {
    this.value = Email.validate(email);
  }

  public static validate(email: string): string {
    const cleaned = email.trim().toLowerCase();

    if (
      !cleaned ||
      cleaned.length > 255 ||
      !cleaned.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      cleaned.includes("..")
    ) {
      throw new InvalidEmailError();
    }

    return cleaned;
  }
}
