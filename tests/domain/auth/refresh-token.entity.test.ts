import { RefreshToken } from "@domain/auth/entities/refresh-token.entity";

describe("RefreshToken", () => {
  it("Campos devem ser atribuído corretamente", () => {
    const refreshToken = new RefreshToken(
      "new-id",
      "new-token",
      "new-user-id",
      new Date("2000-01-01"),
    );

    expect(refreshToken.id).toBe("new-id");
    expect(refreshToken.token).toBe("new-token");
    expect(refreshToken.userId).toBe("new-user-id");
    expect(refreshToken.expiresAt).toEqual(new Date("2000-01-01"));
  });
});
