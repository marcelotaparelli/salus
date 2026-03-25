import { AppError } from "@shared/errors/app-error";

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly createdAt?: Date,
  ) {
    this.id = id || crypto.randomUUID();
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.length < 2) {
      throw new AppError("Nome inválido");
    }

    if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new AppError("Email inválido");
    }
  }
}
