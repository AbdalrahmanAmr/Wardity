import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  isProduction: process.env.NODE_ENV === "production",
  jwt: {
    secret: process.env.JWT_SECRET || "wardity-dev-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
  db: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "wardity",
  },
  rateLimit: {
    api: { windowMs: 15 * 60 * 1000, max: 200 },
    auth: { windowMs: 15 * 60 * 1000, max: 20 },
  },
} as const;
