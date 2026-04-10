import { Router, Request, Response } from "express";
import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";
import { generateId } from "../utils/id.js";
import { z } from "zod";

export const newsletterRouter = Router();

const subscribeSchema = z.object({
  email: z.string().email("Valid email is required"),
});

newsletterRouter.post("/subscribe", async (req: Request, res: Response) => {
  const pool = getPool();
  const { email } = subscribeSchema.parse(req.body);

  const [existing] = await pool.query<RowDataPacket[]>(
    "SELECT id FROM newsletter_subscribers WHERE email = ?", [email] as QueryParams
  );
  if (existing.length > 0) {
    res.json({ message: "You're already subscribed!" });
    return;
  }

  await pool.query(
    "INSERT INTO newsletter_subscribers (id, email) VALUES (?, ?)",
    [generateId(), email] as QueryParams
  );
  res.status(201).json({ message: "Successfully subscribed! Thank you." });
});
