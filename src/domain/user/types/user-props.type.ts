import { Email } from "@domain/value-objects";

export interface UserProps {
  id: string;
  name: string;
  email: Email;
  passwordHash: string;
  createdAt: Date;
}
