import { DomainErrorCategory } from "./domain-error-category.type";

export abstract class DomainError extends Error {
  constructor(
    public readonly message: string,
    public readonly category: DomainErrorCategory,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}
