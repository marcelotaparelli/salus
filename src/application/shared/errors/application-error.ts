import { ApplicationErrorCategory } from "@application/shared/errors/application-error-category.enum";

export abstract class ApplicationError extends Error {
  constructor(
    message: string,
    public readonly category: ApplicationErrorCategory,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}
