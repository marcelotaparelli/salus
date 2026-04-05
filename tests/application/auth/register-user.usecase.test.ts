import { UserRepository } from "@domain/user/repositories/user.repository";
import { InMemoryUserRepository } from "../../infrastructure/database/in-memory/user/user.repository";
import { RegisterUserUseCase } from "@application/auth/register/register-user.usecase";
import { PasswordHasher } from "@domain/auth/services/password-hasher";
import { FakePasswordHasher } from "../../helpers/fake-password-hasher";

describe("RegisterUserUseCase", () => {
  let repo: UserRepository;
  let hasher: PasswordHasher;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    hasher = new FakePasswordHasher();
    useCase = new RegisterUserUseCase(repo, hasher);
  });

  it("deve criar um usuário com senha hasheada", async () => {
    const user = await useCase.execute({
      name: "João Silva",
      email: "joaosilva@email.com",
      password: "password",
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe("João Silva");
    expect(user.email).toBe("joaosilva@email.com");
  });

  it("deve lançar AppError com status 409 se o email já estiver cadastrado", async () => {
    await useCase.execute({
      name: "João Silva",
      email: "joaosilva@email.com",
      password: "password",
    });

    await expect(
      useCase.execute({
        name: "João Silva",
        email: "joaosilva@email.com",
        password: "password",
      }),
    ).rejects.toThrow(Error);
  });

  it("deve lançar AppError se nome for inválido", async () => {
    await expect(
      useCase.execute({
        name: "J",
        email: "joaosilva@email.com",
        password: "password",
      }),
    ).rejects.toThrow(Error);
  });

  it("deve lançar AppEror se email for inválido", async () => {
    await expect(
      useCase.execute({
        name: "João Silva",
        email: "joaosilvaemail.com",
        password: "password",
      }),
    ).rejects.toThrow(Error);
  });
});
