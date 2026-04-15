import { UserRepository } from "@domain/user/repositories/user.repository";
import { PasswordHasher } from "@domain/auth/services/password-hasher";
import { TokenGenerator } from "@domain/auth/services/token-generator";
import { InvalidLoginError } from "@application/auth/errors/invalid-login.error";

export class LoginUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: PasswordHasher,
    private tokenGenerator: TokenGenerator,
  ) {}

  async execute(data: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (!userExists) {
      throw new InvalidLoginError();
    }

    const hashedPassword = userExists.passwordHash;
    const isValidPassword = await this.hasher.verify(
      hashedPassword,
      data.password,
    );

    if (!isValidPassword) {
      throw new InvalidLoginError();
    }

    return {
      token: this.tokenGenerator.generate({
        userId: userExists.id,
        email: userExists.email.value,
      }),
    };
  }
}
