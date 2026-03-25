import { Cpf } from "../../value-objects/cpf.vo";
import { Phone } from "../../value-objects/phone.vo";
import { Name } from "../../value-objects/name.vo";
import { BirthDate } from "../../value-objects/birth-date.vo";

export class Patient {
  constructor(
    public readonly id: string,
    public readonly name: Name,
    public readonly cpf: Cpf,
    public readonly phone: Phone,
    public readonly birthDate: BirthDate,
    public readonly createdAt: Date = new Date(),
  ) {}

  public static create(
    name: Name,
    cpf: Cpf,
    phone: Phone,
    birthDate: BirthDate,
  ): Patient {
    return new Patient(crypto.randomUUID(), name, cpf, phone, birthDate);
  }
}

/*

export class Patient {
  public readonly id: string;

  constructor(
    id: string,
    public readonly name: string,
    public readonly cpf: string,
    public readonly phone: string,
    public readonly birthDate: Date,
    public readonly createdAt?: Date,
  ) {
    this.id = id ?? crypto.randomUUID();
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length < 2) {
      throw new Error("Nome inválido");
    }

    if (!this.isValidCpf(this.cpf)) {
      throw new Error("CPF inválido");
    }

    if (!this.phone || !/^\d+$/.test(this.phone) || this.phone.trim().length < 11) {
      throw new Error("Telefone inválido");
    }

    if (this.birthDate > new Date()) {
      throw new Error("Data de nascimento não pode ser futura");
    }
  }

  private isValidCpf(cpf: string): boolean {
    const cleaned = cpf.replace(/\D/g, "");

    if (cleaned.length !== 11) return false;
    if (/^(\d)\1+$/.test(cleaned)) return false;

    const calc = (mod: number) =>
      cleaned
        .slice(0, mod - 1)
        .split("")
        .reduce((sum, d, i) => sum + Number(d) * (mod - i), 0);

    const d1 = ((calc(10) * 10) % 11) % 10;
    const d2 = ((calc(11) * 10) % 11) % 10;

    return d1 === Number(cleaned[9]) && d2 === Number(cleaned[10]);
  }

  static create(
    name: string,
    cpf: string,
    phone: string,
    birthDate: Date,
  ): Patient {
    return new Patient(crypto.randomUUID(), name, cpf, phone, birthDate);
  }
}

*/
