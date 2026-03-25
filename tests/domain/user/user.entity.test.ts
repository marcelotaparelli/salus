import { User } from "@domain/user/entities/user.entity";
import { AppError } from "@shared/errors/app-error";

describe("User entity", () => {
  it("deve criar um usuário válido", () => {
    const user = new User(
      "id-fake",
      "João Silva",
      "joao@email.com",
      "hash-fake",
    );
    expect(user.id).toBe("id-fake");
    expect(user.name).toBe("João Silva");
    expect(user.email).toBe("joao@email.com");
    expect(user.passwordHash).toBe("hash-fake");
  });

  it("deve gerar um id automaticamente se não for passado", () => {
    const user = new User("", "João Silva", "joao@email.com", "hash-fake");
    expect(user.id).toBeDefined();
    expect(user.id.length).toBeGreaterThan(0);
  });

  it("deve lançar AppError se o nome for inválido", () => {
    expect(
      () => new User("id-fake", "J", "joao@email.com", "hash-fake"),
    ).toThrow(AppError);
  });

  it("deve lançar AppError se o email for inválido", () => {
    expect(
      () => new User("id-fake", "João Silva", "email-invalido", "hash-fake"),
    ).toThrow(AppError);
  });
});
