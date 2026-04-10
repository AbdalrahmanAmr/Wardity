import mysql, { type Pool, type RowDataPacket, type ResultSetHeader } from "mysql2/promise";

let pool: Pool;

export function getPool(): Pool {
  if (!pool) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return pool;
}

/**
 * Initialize MySQL connection pool and create schema
 */
export async function initializeDatabase(): Promise<void> {
  pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "wardity",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
  });

  // Verify connection
  const conn = await pool.getConnection();
  conn.release();

  // Users table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  // Categories table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      image_type VARCHAR(100),
      bg_color VARCHAR(20),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Occasions table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS occasions (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      image_type VARCHAR(100),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      badge VARCHAR(100),
      image TEXT NOT NULL,
      image_desc TEXT,
      brand_logo VARCHAR(255),
      status VARCHAR(50) DEFAULT 'In stock',
      sku VARCHAR(100) UNIQUE,
      description TEXT,
      category_id VARCHAR(36),
      occasion_id VARCHAR(36),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (occasion_id) REFERENCES occasions(id)
    )
  `);

  // Product gallery table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS product_gallery (
      id VARCHAR(36) PRIMARY KEY,
      product_id VARCHAR(36) NOT NULL,
      main_image TEXT NOT NULL,
      thumbnails JSON,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product sizes table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS product_sizes (
      id VARCHAR(36) PRIMARY KEY,
      product_id VARCHAR(36) NOT NULL,
      name VARCHAR(100) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Cart items table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      product_id VARCHAR(36) NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      selected_size VARCHAR(100),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE KEY uq_cart (user_id, product_id, selected_size)
    )
  `);

  // Wishlist table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS wishlist_items (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      product_id VARCHAR(36) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE KEY uq_wishlist (user_id, product_id)
    )
  `);

  // Orders table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      receipt_number VARCHAR(20) UNIQUE,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
      shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
      total DECIMAL(10,2) NOT NULL,
      customer_name VARCHAR(255),
      customer_email VARCHAR(255),
      customer_phone VARCHAR(50),
      shipping_address TEXT NOT NULL,
      city VARCHAR(100),
      area VARCHAR(100),
      delivery_date VARCHAR(50),
      delivery_time VARCHAR(50),
      delivery_notes TEXT,
      payment_method VARCHAR(100),
      payment_details JSON,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Order items table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS order_items (
      id VARCHAR(36) PRIMARY KEY,
      order_id VARCHAR(36) NOT NULL,
      product_id VARCHAR(36) NOT NULL,
      quantity INT NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      selected_size VARCHAR(100),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Contact messages table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Newsletter subscribers table
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Indexes (MySQL CREATE INDEX IF NOT EXISTS requires checking)
  const indexStatements = [
    "CREATE INDEX idx_products_category ON products(category_id)",
    "CREATE INDEX idx_products_occasion ON products(occasion_id)",
    "CREATE INDEX idx_products_name ON products(name)",
    "CREATE INDEX idx_cart_items_user ON cart_items(user_id)",
    "CREATE INDEX idx_wishlist_items_user ON wishlist_items(user_id)",
    "CREATE INDEX idx_orders_user ON orders(user_id)",
    "CREATE INDEX idx_orders_created ON orders(created_at)",
    "CREATE INDEX idx_order_items_order ON order_items(order_id)",
  ];

  for (const stmt of indexStatements) {
    try {
      await pool.execute(stmt);
    } catch {
      // Index already exists — safe to ignore
    }
  }

  console.log("✅ Database initialized successfully");
}

// Helper type for query parameter arrays
export type QueryParams = (string | number | boolean | null)[];

// Re-export types for convenience
export type { Pool, RowDataPacket, ResultSetHeader };
