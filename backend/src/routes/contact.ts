import { Router, Response } from "express";
import { getPool, type QueryParams } from "../database/init.js";
import { validate, contactSchema } from "../utils/validation.js";
import { generateId } from "../utils/id.js";

export const contactRouter = Router();

/**
 * POST /api/contact
 */
contactRouter.post("/", async (req, res: Response) => {
  const pool = getPool();
  const { name, email, subject, message } = validate(contactSchema, req.body);

  const id = generateId();
  await pool.query(
    "INSERT INTO contact_messages (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)",
    [id, name, email, subject, message] as QueryParams
  );

  res.status(201).json({
    message: "Thank you for your message! We'll get back to you soon.",
    status: 201,
  });
});
