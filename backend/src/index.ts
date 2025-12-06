import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";
import { categoriesRouter } from "./routes/categories.js";
import { occasionsRouter } from "./routes/occasions.js";
import { cartRouter } from "./routes/cart.js";
import { wishlistRouter } from "./routes/wishlist.js";
import { ordersRouter } from "./routes/orders.js";
import { initializeDatabase } from "./database/init.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
initializeDatabase();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/occasions", occasionsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/orders", ordersRouter);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

