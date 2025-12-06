import { Router, Response } from "express";
import { db } from "../database/init.js";

export const categoriesRouter = Router();

/**
 * GET /api/categories
 * Get all categories
 */
categoriesRouter.get("/", (_req, res: Response) => {
  const categories = db
    .prepare("SELECT name, image_type as imageType, bg_color as bgColor FROM categories ORDER BY name")
    .all() as Array<{
    name: string;
    imageType: string;
    bgColor: string | null;
  }>;

  const formattedCategories = categories.map((c) => ({
    name: c.name,
    imageType: c.imageType,
    bgColor: c.bgColor || undefined,
  }));

  res.json(formattedCategories);
});

/**
 * GET /api/categories/:slug
 * Get category by slug
 */
categoriesRouter.get("/:slug", (req, res: Response) => {
  const { slug } = req.params;

  const category = db
    .prepare("SELECT name, image_type as imageType, bg_color as bgColor FROM categories WHERE slug = ?")
    .get(slug) as
    | {
        name: string;
        imageType: string;
        bgColor: string | null;
      }
    | undefined;

  if (!category) {
    res.status(404).json({
      message: "Category not found",
      status: 404,
    });
    return;
  }

  res.json({
    name: category.name,
    imageType: category.imageType,
    bgColor: category.bgColor || undefined,
  });
});

