import { Router, Response } from "express";
import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";

export const categoriesRouter = Router();

/**
 * GET /api/categories
 */
categoriesRouter.get("/", async (_req, res: Response) => {
  const pool = getPool();
  const [categories] = await pool.query<RowDataPacket[]>(
    "SELECT name, slug, image_type as imageType, bg_color as bgColor FROM categories ORDER BY name"
  );

  res.json(
    categories.map((c) => ({
      name: c.name,
      slug: c.slug,
      imageType: c.imageType,
      bgColor: c.bgColor || undefined,
    }))
  );
});

/**
 * GET /api/categories/:slug
 */
categoriesRouter.get("/:slug", async (req, res: Response) => {
  const pool = getPool();
  const { slug } = req.params;

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT name, slug, image_type as imageType, bg_color as bgColor FROM categories WHERE slug = ?",
    [slug] as QueryParams
  );

  if (rows.length === 0) {
    res.status(404).json({ message: "Category not found", status: 404 });
    return;
  }

  const category = rows[0];
  res.json({
    name: category.name,
    slug: category.slug,
    imageType: category.imageType,
    bgColor: category.bgColor || undefined,
  });
});
