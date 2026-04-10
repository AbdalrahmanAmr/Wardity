import { Router, Response } from "express";
import * as productService from "../services/productService.js";

export const productsRouter = Router();

productsRouter.get("/", async (req, res: Response) => {
  const result = await productService.getProducts(req.query as Record<string, string>);
  res.json(result);
});

productsRouter.get("/search", async (req, res: Response) => {
  const { q, page = "1", pageSize = "20" } = req.query;

  if (!q || typeof q !== "string") {
    res.status(400).json({ message: "Search query is required", status: 400 });
    return;
  }

  const result = await productService.searchProducts(q, page as string, pageSize as string);
  res.json(result);
});

productsRouter.get("/:id", async (req, res: Response) => {
  const product = await productService.getProductById(req.params.id);

  if (!product) {
    res.status(404).json({ message: "Product not found", status: 404 });
    return;
  }

  res.json(product);
});
