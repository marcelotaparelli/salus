import { DomainErrorCategory } from "./domain-error-category.enum";

export abstract class DomainError extends Error {
  constructor(
    message: string,
    public readonly category: DomainErrorCategory,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}
