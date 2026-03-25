export class DomainError extends Error {
  public readonly statusCode;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = "DomainException";
    this.statusCode = statusCode;
  }
}
