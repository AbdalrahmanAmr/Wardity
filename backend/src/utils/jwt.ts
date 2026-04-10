import jwt, { type SignOptions } from "jsonwebtoken";

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable is required in production");
  }
  return secret || "dev-only-secret-do-not-use-in-prod";
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
  const options: SignOptions = { expiresIn: getExpiresIn() as SignOptions["expiresIn"] };
  return jwt.sign(payload, getSecret(), options);
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, getSecret()) as TokenPayload;
}
