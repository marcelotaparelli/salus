import { Cpf } from "../../value-objects/cpf.vo";
import { Phone } from "../../value-objects/phone.vo";
import { Name } from "../../value-objects/name.vo";
import { BirthDate } from "../../value-objects/birth-date.vo";

export interface PatientProps {
  id: string;
  name: Name;
  cpf: Cpf;
  phone: Phone;
  birthDate: BirthDate;
  createdAt: Date;
}
