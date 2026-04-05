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
      throw new Error("Nome inválido");
    }

    if (!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Email inválido");
    }
  }
}
