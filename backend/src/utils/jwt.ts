import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "fallback-secret-change-in-production";
const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, secret) as TokenPayload;
}

