import { AppError } from "@shared/errors/app-error";

describe("AppError", () => {
  it("Deve criar um AppError com mensagem e código definidos", () => {
    const appError = new AppError("Paciente não encontrado", 404);
    expect(appError.message).toBe("Paciente não encontrado");
    expect(appError.statusCode).toBe(404);
    expect(appError).toBeInstanceOf(Error);
  });
  it("Deve criar um AppError com mensagem e código definido 400", () => {
    const appError = new AppError("Paciente não encontrado");
    expect(appError.message).toBe("Paciente não encontrado");
    expect(appError.statusCode).toBe(400);
    expect(appError).toBeInstanceOf(Error);
  });
});
