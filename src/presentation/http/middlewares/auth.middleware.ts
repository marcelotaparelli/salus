import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@config/env";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  let payload;

  if (!authHeader) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    payload = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      email: string;
    };
  } catch (err) {
    return res.status(401).json({ message: err });
  }

  req.user = payload;

  next();
}
