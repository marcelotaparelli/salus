import { UserMissingRequiredInformationError } from "@domain/user/errors/user-missing-required-information.error";
import { CreateUserInput } from "@domain/user/types/create-user-input.type";
import { UserProps } from "@domain/user/types/user-props.type";
import { Email } from "@domain/value-objects";

export class User {
  private constructor(private props: UserProps) {}

  public static create(input: CreateUserInput): User {
    const missingFields = [];
    if (!input.name) missingFields.push("name");
    if (!input.email) missingFields.push("email");
    if (!input.passwordHash) missingFields.push("passwordHash");

    if (missingFields.length > 0)
      throw new UserMissingRequiredInformationError(missingFields);

    const newUser = new User({
      id: crypto.randomUUID(),
      name: input.name,
      email: new Email(input.email),
      passwordHash: input.passwordHash,
      createdAt: new Date(),
    });

    return newUser;
  }

  public static reconstitute(props: UserProps) {
    return new User(props);
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get passwordHash() {
    return this.props.passwordHash;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
