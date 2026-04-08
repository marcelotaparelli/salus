import { UserRepository } from "@domain/user/repositories/user.repository";
import { User } from "@domain/user/entities/user.entity";
import { prisma } from "../prisma/client";
import { UserPersistenceMapper } from "@infra/mappers/user-persistence.mapper";

export class PrismaUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const toPersistenceUser = UserPersistenceMapper.toPersistence(user);
    await prisma.user.create({ data: toPersistenceUser });
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!result) return null;
    return UserPersistenceMapper.toDomain(result);
  }
}
