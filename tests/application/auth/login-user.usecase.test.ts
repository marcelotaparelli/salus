import { LoginUserUseCase } from "@application/auth/login/login-user.usecase";
import { UserRepository } from "@domain/user/repositories/user.repository";
import { InMemoryUserRepository } from "../../infrastructure/database/in-memory/user/user.repository";
import { PasswordHasher } from "@domain/auth/services/password-hasher";
import { FakePasswordHasher } from "../../helpers/fake-password-hasher";
import { User } from "@domain/user/entities/user.entity";
import { FakeTokenGenerator } from "../../helpers/fake-token-generator";

describe("LoginUserUseCase", () => {
  let loginUseCase: LoginUserUseCase;
  let repo: UserRepository;
  let hasher: PasswordHasher;
  let tokenGenerator: FakeTokenGenerator;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    hasher = new FakePasswordHasher();
    tokenGenerator = new FakeTokenGenerator();
    loginUseCase = new LoginUserUseCase(repo, hasher, tokenGenerator);

    repo.save(
      User.create({
        name: "José Silva",
        email: "josesilva@email.com",
        passwordHash: "hashed_password",
      }),
    );
  });

  it("should throw an error if email doesn't exist", async () => {
    await expect(
      loginUseCase.execute({
        email: "augustosilva@email.com",
        password: "password",
      }),
    ).rejects.toThrow(Error);
  });

  it("should throw an error if password is wrong", async () => {
    await expect(
      loginUseCase.execute({
        email: "josesilva@email.com",
        password: "wrong-password",
      }),
    ).rejects.toThrow(Error);
  });

  it("should return a valid token", async () => {
    const result = await loginUseCase.execute({
      email: "josesilva@email.com",
      password: "password",
    });

    expect(result.token).toBeDefined();
  });
});
