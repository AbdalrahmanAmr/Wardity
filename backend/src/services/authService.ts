import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { generateId } from "../utils/id.js";

interface AuthResult {
  user: { id: string; email: string; name: string; phone?: string };
  token: string;
}

export async function register(email: string, password: string, name: string): Promise<AuthResult> {
  const pool = getPool();
  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM users WHERE email = ?", [email] as QueryParams
  );

  if (existing.length > 0) {
    const err = new Error("User with this email already exists") as Error & { statusCode: number };
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await hashPassword(password);
  const userId = generateId();
  await pool.query(
    "INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)",
    [userId, email, name, passwordHash] as QueryParams
  );

  const token = generateToken({ userId, email, name });
  return { user: { id: userId, email, name }, token };
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, email, name, password_hash FROM users WHERE email = ?", [email] as QueryParams
  );

  if (rows.length === 0) {
    const err = new Error("Invalid email or password") as Error & { statusCode: number };
    err.statusCode = 401;
    throw err;
  }

  const user = rows[0];
  const isValid = await comparePassword(password, user.password_hash);
  if (!isValid) {
    const err = new Error("Invalid email or password") as Error & { statusCode: number };
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken({ userId: user.id, email: user.email, name: user.name });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
}

export async function getProfile(userId: string) {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, email, name, phone FROM users WHERE id = ?", [userId] as QueryParams
  );

  if (rows.length === 0) return null;

  const user = rows[0];
  return { id: user.id, email: user.email, name: user.name, phone: user.phone || undefined };
}

export async function updateProfile(userId: string, data: { name?: string; phone?: string | null }) {
  const pool = getPool();
  const updates: string[] = [];
  const values: QueryParams = [];

  if (data.name !== undefined) { updates.push("name = ?"); values.push(data.name); }
  if (data.phone !== undefined) { updates.push("phone = ?"); values.push(data.phone); }

  if (updates.length === 0) return null;

  values.push(userId);
  await pool.query(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, values);

  return getProfile(userId);
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT password_hash FROM users WHERE id = ?", [userId] as QueryParams
  );

  if (rows.length === 0) {
    const err = new Error("User not found") as Error & { statusCode: number };
    err.statusCode = 404;
    throw err;
  }

  const isValid = await comparePassword(currentPassword, rows[0].password_hash);
  if (!isValid) {
    const err = new Error("Current password is incorrect") as Error & { statusCode: number };
    err.statusCode = 401;
    throw err;
  }

  const newHash = await hashPassword(newPassword);
  await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [newHash, userId] as QueryParams);
}
