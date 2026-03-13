export interface TokenGenerator {
  generate(data: { userId: string; email: string }): string;
}
