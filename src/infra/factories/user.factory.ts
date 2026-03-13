import { RegisterUserUseCase } from "@application/auth/register-user.usecase";
import { LoginUserUseCase } from "@application/auth/login-user.usecase";
import { JwtTokenGenerator } from "@infra/auth/jwt-token-generator";
import { UserRepository } from "@domain/user/user.repository";
import { PrismaUserRepository } from "@infra/database/prisma/user.repository";
import { Argon2PasswordHasher } from "@infra/auth/argon2-password-hasher";

export function makeUserUseCases(repository?: UserRepository) {
  const repo = repository ?? new PrismaUserRepository();
  const hasher = new Argon2PasswordHasher();
  const tokenGenerator = new JwtTokenGenerator();

  const registerUseCase = new RegisterUserUseCase(repo, hasher);
  const loginUseCase = new LoginUserUseCase(repo, hasher, tokenGenerator);

  return {
    registerUseCase,
    loginUseCase,
  };
}
