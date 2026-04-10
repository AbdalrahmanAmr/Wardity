import { initializeDatabase, getPool } from "../database/init.js";
import { generateId, generateSlug } from "../utils/id.js";
import { hashPassword } from "../utils/password.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Seed database with initial data
 */
async function seed(): Promise<void> {
  console.log("🌱 Starting database seed...");

  await initializeDatabase();
  const pool = getPool();

  console.log("🧹 Clearing existing data...");
  // Disable FK checks temporarily for clean truncation
  await pool.execute("SET FOREIGN_KEY_CHECKS = 0");
  const tables = [
    "order_items", "orders", "cart_items", "wishlist_items",
    "product_sizes", "product_gallery", "products",
    "occasions", "categories", "users",
    "contact_messages", "newsletter_subscribers",
  ];
  for (const table of tables) {
    await pool.execute(`DELETE FROM ${table}`);
  }
  await pool.execute("SET FOREIGN_KEY_CHECKS = 1");

  console.log("👤 Creating test user...");
  const userId = generateId();
  const passwordHash = await hashPassword("password123");
  await pool.execute(
    "INSERT INTO users (id, email, name, password_hash) VALUES (?, ?, ?, ?)",
    [userId, "test@example.com", "Test User", passwordHash]
  );

  console.log("📁 Creating categories...");
  const categories = [
    { name: "Flowers", imageType: "flower", bgColor: "#FFE5E5" },
    { name: "Gifts", imageType: "gift", bgColor: "#E5F3FF" },
    { name: "Cakes", imageType: "cake", bgColor: "#FFF5E5" },
    { name: "Chocolates", imageType: "chocolate", bgColor: "#E5FFE5" },
    { name: "Hand Bouquets", imageType: "hand-bouquet", bgColor: "#FCE4EC" },
    { name: "Flower Boxes", imageType: "flower-box", bgColor: "#F3E5F5" },
    { name: "Vases", imageType: "vase", bgColor: "#E8EAF6" },
    { name: "Plants", imageType: "plant", bgColor: "#E8F5E9" },
  ];

  const categoryIds: Record<string, string> = {};
  for (const cat of categories) {
    const id = generateId();
    const slug = generateSlug(cat.name);
    await pool.execute(
      "INSERT INTO categories (id, name, slug, image_type, bg_color) VALUES (?, ?, ?, ?, ?)",
      [id, cat.name, slug, cat.imageType, cat.bgColor]
    );
    categoryIds[cat.name] = id;
  }

  console.log("🎉 Creating occasions...");
  const occasions = [
    { name: "Happy Birthday", imageType: "birthday" },
    { name: "New Born", imageType: "newborn" },
    { name: "I Love You", imageType: "love" },
    { name: "Congratulations", imageType: "congrats" },
    { name: "Get Well Soon", imageType: "getwell" },
    { name: "Graduation", imageType: "graduation" },
    { name: "Anniversary", imageType: "anniversary" },
    { name: "Wedding", imageType: "wedding" },
    { name: "Housewarming", imageType: "housewarming" },
    { name: "Thank You", imageType: "thankyou" },
  ];

  const occasionIds: Record<string, string> = {};
  for (const occ of occasions) {
    const id = generateId();
    const slug = generateSlug(occ.name);
    await pool.execute(
      "INSERT INTO occasions (id, name, slug, image_type) VALUES (?, ?, ?, ?)",
      [id, occ.name, slug, occ.imageType]
    );
    occasionIds[occ.name] = id;
  }

  console.log("🛍️ Creating products...");
  const products = [
    {
      name: "Red Rose Bouquet",
      price: 49.99,
      badge: "Best Seller",
      image: "https://images.unsplash.com/photo-1518895949257-8f4a8dc89fd0?w=400",
      description: "Beautiful red roses arranged in an elegant bouquet",
      category: "Flowers",
      occasion: "I Love You",
      status: "In stock",
      sku: "ROSE-001",
    },
    {
      name: "Birthday Cake",
      price: 29.99,
      badge: null,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
      description: "Delicious chocolate birthday cake",
      category: "Cakes",
      occasion: "Happy Birthday",
      status: "In stock",
      sku: "CAKE-001",
    },
    {
      name: "Premium Chocolate Box",
      price: 39.99,
      badge: "New",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4cbc5e59?w=400",
      description: "Assorted premium chocolates in a gift box",
      category: "Chocolates",
      occasion: null,
      status: "In stock",
      sku: "CHOC-001",
    },
    {
      name: "Anniversary Gift Set",
      price: 79.99,
      badge: null,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
      description: "Special gift set for your anniversary",
      category: "Gifts",
      occasion: "Anniversary",
      status: "In stock",
      sku: "GIFT-001",
    },
    {
      name: "White Lily Bouquet",
      price: 44.99,
      badge: null,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400",
      description: "Elegant white lilies for any occasion",
      category: "Flowers",
      occasion: null,
      status: "In stock",
      sku: "LILY-001",
    },
    {
      name: "Wedding Cake",
      price: 199.99,
      badge: "Premium",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400",
      description: "Beautiful multi-tier wedding cake",
      category: "Cakes",
      occasion: "Wedding",
      status: "In stock",
      sku: "CAKE-002",
    },
  ];

  for (const product of products) {
    const productId = generateId();
    await pool.execute(
      "INSERT INTO products (id, name, price, badge, image, description, category_id, occasion_id, status, sku) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        productId, product.name, product.price, product.badge, product.image,
        product.description,
        product.category ? categoryIds[product.category] : null,
        product.occasion ? occasionIds[product.occasion] : null,
        product.status, product.sku,
      ]
    );

    const galleryId = generateId();
    const thumbnails = JSON.stringify([product.image, product.image, product.image]);
    await pool.execute(
      "INSERT INTO product_gallery (id, product_id, main_image, thumbnails) VALUES (?, ?, ?, ?)",
      [galleryId, productId, product.image, thumbnails]
    );

    if (product.category === "Cakes" || product.category === "Flowers") {
      const sizes = [
        { name: "Small", price: product.price * 0.8 },
        { name: "Medium", price: product.price },
        { name: "Large", price: product.price * 1.3 },
      ];

      for (const size of sizes) {
        const sizeId = generateId();
        await pool.execute(
          "INSERT INTO product_sizes (id, product_id, name, price) VALUES (?, ?, ?, ?)",
          [sizeId, productId, size.name, size.price]
        );
      }
    }
  }

  console.log("✅ Database seeded successfully!");
  console.log("\n📝 Test credentials:");
  console.log("   Email: test@example.com");
  console.log("   Password: password123");
  console.log("\n🚀 You can now start the server with: npm run dev");

  await pool.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
