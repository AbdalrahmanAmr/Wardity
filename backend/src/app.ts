import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import "express-async-errors";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { authRouter } from "./routes/auth.js";
import { productsRouter } from "./routes/products.js";
import { categoriesRouter } from "./routes/categories.js";
import { occasionsRouter } from "./routes/occasions.js";
import { cartRouter } from "./routes/cart.js";
import { wishlistRouter } from "./routes/wishlist.js";
import { ordersRouter } from "./routes/orders.js";
import { contactRouter } from "./routes/contact.js";
import { newsletterRouter } from "./routes/newsletter.js";
import { initializeDatabase } from "./database/init.js";

const app = express();

// Required behind Vercel's reverse proxy so express-rate-limit sees the real client IP
app.set("trust proxy", 1);

app.use(helmet());
app.use(morgan("dev"));

const apiLimiter = rateLimit({
  windowMs: config.rateLimit.api.windowMs,
  max: config.rateLimit.api.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later.", status: 429 },
});

const authLimiter = rateLimit({
  windowMs: config.rateLimit.auth.windowMs,
  max: config.rateLimit.auth.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts, please try again later.", status: 429 },
});

if (!process.env.CORS_ORIGIN && config.isProduction) {
  console.warn("CORS_ORIGIN not set — defaulting to localhost. Set CORS_ORIGIN for production.");
}
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Lazy DB initialization for serverless environments (e.g. Vercel).
// For traditional hosting, index.ts pre-initializes before server start so
// this middleware resolves instantly on every request (pool already exists).
// The promise is reset on failure so the next request retries initialization.
let dbInitPromise: Promise<void> | null = null;
app.use(async (_req, _res, next) => {
  if (!dbInitPromise) {
    dbInitPromise = initializeDatabase().catch((err) => {
      dbInitPromise = null; // Reset so the next request retries
      throw err;
    });
  }
  try {
    await dbInitPromise;
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api", apiLimiter);

app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/occasions", occasionsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/contact", contactRouter);
app.use("/api/newsletter", newsletterRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
