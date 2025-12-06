import { Router, Response } from "express";
import { db } from "../database/init.js";

export const occasionsRouter = Router();

/**
 * GET /api/occasions
 * Get all occasions
 */
occasionsRouter.get("/", (_req, res: Response) => {
  const occasions = db
    .prepare("SELECT name, image_type as imageType FROM occasions ORDER BY name")
    .all() as Array<{
    name: string;
    imageType: string;
  }>;

  res.json(occasions);
});

/**
 * GET /api/occasions/:slug
 * Get occasion by slug
 */
occasionsRouter.get("/:slug", (req, res: Response) => {
  const { slug } = req.params;

  const occasion = db
    .prepare("SELECT name, image_type as imageType FROM occasions WHERE slug = ?")
    .get(slug) as
    | {
        name: string;
        imageType: string;
      }
    | undefined;

  if (!occasion) {
    res.status(404).json({
      message: "Occasion not found",
      status: 404,
    });
    return;
  }

  res.json({
    name: occasion.name,
    imageType: occasion.imageType,
  });
});

