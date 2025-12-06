import { Router, Response } from "express";
import { db } from "../database/init.js";
import { generateId } from "../utils/id.js";

export const productsRouter = Router();

/**
 * GET /api/products
 * Get all products with optional filters and pagination
 */
productsRouter.get("/", (req, res: Response) => {
  const {
    page = "1",
    pageSize = "20",
    category,
    occasion,
    search,
    minPrice,
    maxPrice,
    status,
  } = req.query;

  const pageNum = parseInt(page as string, 10);
  const pageSizeNum = parseInt(pageSize as string, 10);
  const offset = (pageNum - 1) * pageSizeNum;

  let query = "SELECT * FROM products WHERE 1=1";
  const params: unknown[] = [];

  if (category) {
    query += " AND category_id = ?";
    params.push(category);
  }

  if (occasion) {
    query += " AND occasion_id = ?";
    params.push(occasion);
  }

  if (search) {
    query += " AND name LIKE ?";
    params.push(`%${search}%`);
  }

  if (minPrice) {
    query += " AND price >= ?";
    params.push(parseFloat(minPrice as string));
  }

  if (maxPrice) {
    query += " AND price <= ?";
    params.push(parseFloat(maxPrice as string));
  }

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  // Get total count
  const countQuery = query.replace("SELECT *", "SELECT COUNT(*) as count");
  const totalResult = db.prepare(countQuery).get(...params) as { count: number };
  const total = totalResult.count;

  // Get paginated results
  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  params.push(pageSizeNum, offset);

  const products = db.prepare(query).all(...params) as Array<{
    id: string;
    name: string;
    price: number;
    badge: string | null;
    image: string;
    image_desc: string | null;
    brand_logo: string | null;
    status: string;
    sku: string | null;
    description: string | null;
    category_id: string | null;
    occasion_id: string | null;
  }>;

  const formattedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    badge: p.badge,
    image: p.image,
    imageDesc: p.image_desc,
    brandLogo: p.brand_logo,
    status: p.status as "In stock" | "Out of stock",
    sku: p.sku,
  }));

  // If pagination is requested, return paginated response
  if (page || pageSize) {
    const totalPages = Math.ceil(total / pageSizeNum);
    res.json({
      data: formattedProducts,
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages,
    });
  } else {
    res.json(formattedProducts);
  }
});

/**
 * GET /api/products/search
 * Search products by query string
 */
productsRouter.get("/search", (req, res: Response) => {
  const { q } = req.query;

  if (!q || typeof q !== "string") {
    res.status(400).json({
      message: "Search query is required",
      status: 400,
    });
    return;
  }

  const products = db
    .prepare(
      "SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC"
    )
    .all(`%${q}%`, `%${q}%`) as Array<{
    id: string;
    name: string;
    price: number;
    badge: string | null;
    image: string;
    image_desc: string | null;
    brand_logo: string | null;
    status: string;
    sku: string | null;
  }>;

  const formattedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    badge: p.badge,
    image: p.image,
    imageDesc: p.image_desc,
    brandLogo: p.brand_logo,
    status: p.status as "In stock" | "Out of stock",
    sku: p.sku,
  }));

  res.json(formattedProducts);
});

/**
 * GET /api/products/:id
 * Get single product by ID with full details
 */
productsRouter.get("/:id", (req, res: Response) => {
  const { id } = req.params;

  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(id) as
    | {
        id: string;
        name: string;
        price: number;
        badge: string | null;
        image: string;
        image_desc: string | null;
        brand_logo: string | null;
        status: string;
        sku: string | null;
        description: string | null;
      }
    | undefined;

  if (!product) {
    res.status(404).json({
      message: "Product not found",
      status: 404,
    });
    return;
  }

  // Get gallery
  const gallery = db
    .prepare("SELECT * FROM product_gallery WHERE product_id = ?")
    .get(id) as
    | {
        main_image: string;
        thumbnails: string | null;
      }
    | undefined;

  // Get sizes
  const sizes = db
    .prepare("SELECT name, price FROM product_sizes WHERE product_id = ?")
    .all(id) as Array<{ name: string; price: number }>;

  const thumbnails = gallery?.thumbnails
    ? JSON.parse(gallery.thumbnails)
    : [];

  res.json({
    id: product.id,
    name: product.name,
    price: product.price,
    badge: product.badge,
    image: product.image,
    imageDesc: product.image_desc,
    brandLogo: product.brand_logo,
    status: product.status as "In stock" | "Out of stock",
    sku: product.sku,
    description: product.description,
    gallery: {
      mainImage: gallery?.main_image || product.image,
      thumbnails: thumbnails.length > 0 ? thumbnails : [product.image],
    },
    sizes: sizes.length > 0 ? sizes : undefined,
  });
});

