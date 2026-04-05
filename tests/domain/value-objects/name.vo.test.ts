import { Name } from "@domain/value-objects/name.vo";
import { InvalidNameError } from "@domain/value-objects/errors/invalid-name.error";

describe("Name value object", () => {
  let name: Name;

  beforeEach(() => {
    name = new Name("Marcelo Taparelli");
  });

  it("Deve retornar erro de validação caso o nome seja vazio", () => {
    expect(() => new Name("")).toThrow(InvalidNameError);
  });

  it("Deve retornar erro de validação caso o nome seja menor que 3", () => {
    expect(() => new Name("Ma")).toThrow(InvalidNameError);
  });

  it("Deve retornar erro de validação caso o nome seja maior que 150", () => {
    expect(() => new Name("a".repeat(151))).toThrow(InvalidNameError);
  });

  it("Deve validar nomes corretos", () => {
    expect(name.value).toBe("Marcelo Taparelli");
  });

  it("Deve retornar o primeiro nome", () => {
    expect(name.getFirstName()).toBe("Marcelo");
  });

  it("Deve retornar o segundo nome", () => {
    expect(name.getLastName()).toBe("Taparelli");
  });
});
