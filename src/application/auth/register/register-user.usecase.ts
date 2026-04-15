import { UserRepository } from "@domain/user/repositories/user.repository";
import { PasswordHasher } from "@domain/auth/services/password-hasher";
import { RegisterUserDTO } from "./register-user.dto";
import { RegisterUserResponseDTO } from "./register-user-response.dto";
import { User } from "@domain/user/entities/user.entity";
import { UserAlreadyExistsError } from "@application/auth/errors/user-already-exists.error";

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: PasswordHasher,
  ) {}

  async execute(user: RegisterUserDTO): Promise<RegisterUserResponseDTO> {
    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await this.hasher.hash(user.password);

    const newUser = User.create({
      name: user.name,
      email: user.email,
      passwordHash: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email.value,
    };
  }
}
