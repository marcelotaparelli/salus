import { User } from "@domain/user/entities/user.entity";
import { Email } from "@domain/value-objects";

export interface RawUserProps {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export class UserPersistenceMapper {
  private constructor() {}

  public static toDomain(data: RawUserProps): User {
    return User.reconstitute({
      id: data.id,
      name: data.name,
      email: new Email(data.email),
      passwordHash: data.passwordHash,
      createdAt: data.createdAt,
    });
  }

  public static toPersistence(user: User): RawUserProps {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      passwordHash: user.passwordHash,
      createdAt: user.createdAt,
    };
  }
}
