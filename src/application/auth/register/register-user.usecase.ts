import { UserRepository } from "@domain/user/repositories/user.repository";
import { PasswordHasher } from "@domain/auth/services/password-hasher";
import { RegisterUserDTO } from "./register-user.dto";
import { RegisterUserResponseDTO } from "./register-user-response.dto";
import { User } from "@domain/user/entities/user.entity";
import { AppError } from "@shared/errors/app-error";
import { randomUUID } from "crypto";

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: PasswordHasher,
  ) {}

  async execute(user: RegisterUserDTO): Promise<RegisterUserResponseDTO> {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw new AppError("Email already in use", 409);
    }

    const hashedPassword = await this.hasher.hash(user.password);

    const newUser = new User(
      randomUUID(),
      user.name,
      user.email,
      hashedPassword,
    );

    await this.userRepository.save(newUser);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }
}
