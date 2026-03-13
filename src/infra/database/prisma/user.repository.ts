import { UserRepository } from "@domain/user/user.repository";
import { User } from "@domain/user/user.entity";
import { prisma } from "./client";

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!result) return null;
    return new User(
      result.id,
      result.name,
      result.email,
      result.passwordHash,
      result.createdAt,
    );
  }
}
