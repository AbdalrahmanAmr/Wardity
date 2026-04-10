import { getPool, type RowDataPacket, type QueryParams } from "../database/init.js";
import type { FormattedProduct, PaginatedResult } from "../models/index.js";

interface ProductFilters {
  page?: string;
  pageSize?: string;
  category?: string;
  categorySlug?: string;
  occasion?: string;
  occasionSlug?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  status?: string;
  badge?: string;
  collection?: string;
}

function formatProduct(p: RowDataPacket): FormattedProduct {
  return {
    id: p.id,
    name: p.name,
    price: Number(p.price),
    badge: p.badge,
    image: p.image,
    imageDesc: p.image_desc,
    brandLogo: p.brand_logo,
    status: p.status as "In stock" | "Out of stock",
    sku: p.sku,
  };
}

export async function getProducts(filters: ProductFilters): Promise<PaginatedResult<FormattedProduct>> {
  const pool = getPool();
  const {
    page = "1", pageSize = "20",
    category, categorySlug, occasion, occasionSlug,
    search, minPrice, maxPrice, status, badge, collection,
  } = filters;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSizeNum = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 20));
  const offset = (pageNum - 1) * pageSizeNum;

  let query = "SELECT * FROM products WHERE 1=1";
  const params: QueryParams = [];

  if (category) {
    query += " AND category_id = ?";
    params.push(String(category));
  }

  if (categorySlug) {
    const [cats] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM categories WHERE slug = ?", [String(categorySlug)]
    );
    if (cats.length === 0) return { data: [], total: 0, page: pageNum, pageSize: pageSizeNum, totalPages: 0 };
    query += " AND category_id = ?";
    params.push(cats[0].id);
  }

  if (occasion) {
    query += " AND occasion_id = ?";
    params.push(String(occasion));
  }

  if (occasionSlug) {
    const [occs] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM occasions WHERE slug = ?", [String(occasionSlug)]
    );
    if (occs.length === 0) return { data: [], total: 0, page: pageNum, pageSize: pageSizeNum, totalPages: 0 };
    query += " AND occasion_id = ?";
    params.push(occs[0].id);
  }

  if (collection) {
    const [occs] = await pool.query<RowDataPacket[]>(
      "SELECT id FROM occasions WHERE slug = ?", [String(collection)]
    );
    if (occs.length === 0) return { data: [], total: 0, page: pageNum, pageSize: pageSizeNum, totalPages: 0 };
    query += " AND occasion_id = ?";
    params.push(occs[0].id);
  }

  if (search) {
    query += " AND (name LIKE ? OR description LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (minPrice) {
    const val = parseFloat(minPrice);
    if (!isNaN(val)) { query += " AND price >= ?"; params.push(val); }
  }

  if (maxPrice) {
    const val = parseFloat(maxPrice);
    if (!isNaN(val)) { query += " AND price <= ?"; params.push(val); }
  }

  if (status) { query += " AND status = ?"; params.push(String(status)); }
  if (badge) { query += " AND badge = ?"; params.push(String(badge)); }

  const countQuery = query.replace("SELECT *", "SELECT COUNT(*) as count");
  const [countRows] = await pool.query<RowDataPacket[]>(countQuery, params);
  const total = countRows[0].count as number;

  query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  params.push(pageSizeNum, offset);
  const [products] = await pool.query<RowDataPacket[]>(query, params);

  return {
    data: products.map(formatProduct),
    total,
    page: pageNum,
    pageSize: pageSizeNum,
    totalPages: Math.ceil(total / pageSizeNum),
  };
}

export async function searchProducts(q: string, page: string, pageSize: string): Promise<PaginatedResult<FormattedProduct>> {
  const pool = getPool();
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSizeNum = Math.min(100, Math.max(1, parseInt(pageSize, 10) || 20));
  const offset = (pageNum - 1) * pageSizeNum;

  const [countRows] = await pool.query<RowDataPacket[]>(
    "SELECT COUNT(*) as total FROM products WHERE name LIKE ? OR description LIKE ?",
    [`%${q}%`, `%${q}%`]
  );
  const total = countRows[0].total as number;

  const [products] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM products WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
    [`%${q}%`, `%${q}%`, pageSizeNum, offset]
  );

  return {
    data: products.map(formatProduct),
    total,
    page: pageNum,
    pageSize: pageSizeNum,
    totalPages: Math.ceil(total / pageSizeNum),
  };
}

export async function getProductById(id: string) {
  const pool = getPool();
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM products WHERE id = ?", [id]);
  if (rows.length === 0) return null;

  const product = rows[0];
  const [galleryRows] = await pool.query<RowDataPacket[]>("SELECT * FROM product_gallery WHERE product_id = ?", [id]);
  const gallery = galleryRows[0] || null;
  const [sizes] = await pool.query<RowDataPacket[]>("SELECT name, price FROM product_sizes WHERE product_id = ?", [id]);

  const thumbnails = gallery?.thumbnails
    ? (typeof gallery.thumbnails === "string" ? JSON.parse(gallery.thumbnails) : gallery.thumbnails)
    : [];

  return {
    ...formatProduct(product),
    description: product.description,
    gallery: {
      mainImage: gallery?.main_image || product.image,
      thumbnails: thumbnails.length > 0 ? thumbnails : [product.image],
    },
    sizes: sizes.length > 0 ? sizes.map((s: RowDataPacket) => ({ name: s.name, price: Number(s.price) })) : undefined,
  };
}
