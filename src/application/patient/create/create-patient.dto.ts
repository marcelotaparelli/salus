import { Cpf } from "@domain/value-objects/cpf.vo";
import { Phone } from "@domain/value-objects/phone.vo";
import { Name } from "@domain/value-objects/name.vo";
import { BirthDate } from "@domain/value-objects/birth-date.vo";

export interface CreatePatientDTO {
  name: Name;
  cpf: Cpf;
  phone: Phone;
  birthDate: BirthDate;
}
