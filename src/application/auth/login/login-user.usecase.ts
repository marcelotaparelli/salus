import { UserRepository } from "@domain/user/repositories/user.repository";
import { PasswordHasher } from "@domain/auth/services/password-hasher";
import { TokenGenerator } from "@domain/auth/services/token-generator";

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
      throw new Error("Usuário ou senha inválidos");
    }

    const hashedPassword = userExists.passwordHash;
    const isValidPassword = await this.hasher.verify(
      hashedPassword,
      data.password,
    );

    if (!isValidPassword) {
      throw new Error("Usuario ou senha inválidos");
    }

    return {
      token: this.tokenGenerator.generate({
        userId: userExists.id,
        email: userExists.email,
      }),
    };
  }
}
