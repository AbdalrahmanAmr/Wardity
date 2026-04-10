import { Router, Response } from "express";
import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";

export const occasionsRouter = Router();

/**
 * GET /api/occasions
 */
occasionsRouter.get("/", async (_req, res: Response) => {
  const pool = getPool();
  const [occasions] = await pool.query<RowDataPacket[]>(
    "SELECT name, slug, image_type as imageType FROM occasions ORDER BY name"
  );

  res.json(occasions.map((o) => ({ name: o.name, slug: o.slug, imageType: o.imageType })));
});

/**
 * GET /api/occasions/:slug
 */
occasionsRouter.get("/:slug", async (req, res: Response) => {
  const pool = getPool();
  const { slug } = req.params;

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT name, slug, image_type as imageType FROM occasions WHERE slug = ?",
    [slug] as QueryParams
  );

  if (rows.length === 0) {
    res.status(404).json({ message: "Occasion not found", status: 404 });
    return;
  }

  res.json({ name: rows[0].name, slug: rows[0].slug, imageType: rows[0].imageType });
});
