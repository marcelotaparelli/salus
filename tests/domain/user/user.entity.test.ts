import { User } from "@domain/user/entities/user.entity";
import { UserMissingRequiredInformationError } from "@domain/user/errors/user-missing-required-information.error";

describe("User Entity", () => {
  const validUserData = {
    name: "Marcelo",
    email: "teste@teste.com",
    passwordHash: "hash_simulado",
  };

  it("should throw UserMissingRequiredInformationError when name is empty", () => {
    const input = {
      name: "",
      email: "teste@teste.com",
      passwordHash: "teste123",
    };

    expect(() => User.create(input)).toThrow(
      UserMissingRequiredInformationError,
    );
  });

  it("should throw UserMissingRequiredInformationError when email is empty", () => {
    const input = {
      name: "Marcelo",
      email: "",
      passwordHash: "teste123",
    };

    expect(() => User.create(input)).toThrow(
      UserMissingRequiredInformationError,
    );
  });

  it("should throw UserMissingRequiredInformationError when passwordHash is empty", () => {
    const input = {
      name: "Marcelo",
      email: "teste@teste.com",
      passwordHash: "",
    };

    expect(() => User.create(input)).toThrow(
      UserMissingRequiredInformationError,
    );
  });

  it("should create a User", () => {
    const user = User.create(validUserData);

    expect(user.id).toBeDefined();
    expect(typeof user.name).toBe("string");
    expect(typeof user.email.value).toBe("string");
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});
