export class Phone {
  public readonly value: string;

  constructor(phone: string) {
    const cleaned = phone.replace(/\D/g, "");

    if (!Phone.isValid(cleaned)) {
      throw new Error("Celular inválido. O formato deve ser (DDD) 9XXXX-XXXX");
    }

    this.value = cleaned;
  }

  static isValid(phone: string): boolean {
    const isLengthValid = phone.length === 11;
    const startsWithNine = phone[2] === "9";
    const isNotRepeated = !/^(\d)\1+$/.test(phone);

    return isLengthValid && startsWithNine && isNotRepeated;
  }

  public format(): string {
    return this.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  public toString(): string {
    return this.value;
  }
}
