import { UserRepository } from "@domain/user/repositories/user.repository";
import { InMemoryUserRepository } from "../../infrastructure/database/in-memory/user/user.repository";
import { RegisterUserUseCase } from "@application/auth/register/register-user.usecase";
import { PasswordHasher } from "@domain/auth/services/password-hasher";
import { FakePasswordHasher } from "../../helpers/fake-password-hasher";
import { UserAlreadyExistsError } from "@application/auth/errors/user-already-exists.error";

describe("RegisterUserUseCase", () => {
  let repo: UserRepository;
  let hasher: PasswordHasher;
  let useCase: RegisterUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    hasher = new FakePasswordHasher();
    useCase = new RegisterUserUseCase(repo, hasher);
  });

  it("should create a user and a password hash", async () => {
    const user = await useCase.execute({
      name: "João Silva",
      email: "joaosilva@email.com",
      password: "password",
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe("João Silva");
    expect(user.email).toBe("joaosilva@email.com");
  });

  it("should throw UserAlreadyExistsError for registered email", async () => {
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
    ).rejects.toThrow(UserAlreadyExistsError);
  });
});
