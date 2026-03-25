export class Cpf {
  public readonly value: string;

  constructor(cpf: string) {
    const cleaned = cpf.replace(/\D/g, "");
    if (!Cpf.isValid(cleaned)) throw new Error("CPF inválido");
    this.value = cleaned;
  }

  public toString(): string {
    return this.value;
  }

  public format(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  static isValid(cpf: string): boolean {
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) return false;
    if (/^(\d)\1+$/.test(digits)) return false;

    const calc = (mod: number) =>
      digits
        .slice(0, mod - 1)
        .split("")
        .reduce((sum, d, i) => sum + Number(d) * (mod - i), 0);

    const d1 = ((calc(10) * 10) % 11) % 10;
    const d2 = ((calc(11) * 10) % 11) % 10;

    return d1 === Number(digits[9]) && d2 === Number(digits[10]);
  }
}
