import jwt from "jsonwebtoken";

function getSecret(): string {
  return process.env.JWT_SECRET || "fallback-secret-change-in-production";
}

function getExpiresIn(): string {
  return process.env.JWT_EXPIRES_IN || "7d";
}

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: getExpiresIn() });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, getSecret()) as TokenPayload;
}

