import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url("DATABASE_URL inválida"),
  ARGON2_PEPPER: z
    .string()
    .min(32, "ARGON2_PEPPER deve ter pelo menos 32 caracteres"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET deve ter pelo menos 32 caracteres"),
});

export const env = envSchema.parse(process.env);
