# Wardity Backend API

The backend server for the Wardity e-commerce platform. Built with Node.js, Express, TypeScript, and MySQL.

> This is the "kitchen" of the restaurant -- it handles all the behind-the-scenes work like storing data, checking passwords, processing orders, and sending emails.

## Tech Stack

| Technology | What It Does |
|-----------|-------------|
| **Node.js** | Runs JavaScript on the server (the engine) |
| **Express.js** | Handles HTTP requests and routing (the waiter) |
| **TypeScript** | Adds type safety to JavaScript (the spell-checker) |
| **MySQL** | Relational database for storing all data (the filing cabinet) |
| **JWT** | Creates login tokens for authentication (the wristband) |
| **bcryptjs** | Hashes passwords securely (the scrambler) |
| **Zod** | Validates input data (the security guard) |
| **Nodemailer** | Sends emails for order notifications (the mailman) |
| **Helmet** | Adds security headers (the helmet) |
| **express-rate-limit** | Prevents request spam (the speed limiter) |
| **Morgan** | Logs HTTP requests for debugging (the logbook) |

## Quick Start

### Prerequisites

- Node.js 18+ (https://nodejs.org)
- MySQL running (via XAMPP: https://www.apachefriends.org)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create the MySQL database
mysql -u root -p -e "CREATE DATABASE wardity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. Copy environment file and fill in your values
copy .env.example .env

# 4. Seed the database with sample data
npm run seed

# 5. Start the development server
npm run dev
```

The server starts at `http://localhost:3001`.

### Verify It Works

```bash
curl http://localhost:3001/health
# Should return: {"status":"ok","timestamp":"..."}
```

## Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No (default: 3001) | Server port |
| `NODE_ENV` | No (default: development) | Environment mode |
| `DB_HOST` | Yes | MySQL host |
| `DB_PORT` | Yes | MySQL port (default: 3306) |
| `DB_USER` | Yes | MySQL username |
| `DB_PASSWORD` | Yes | MySQL password |
| `DB_NAME` | Yes | MySQL database name |
| `JWT_SECRET` | Yes | Secret key for login tokens |
| `JWT_EXPIRES_IN` | No (default: 7d) | Token expiry time |
| `CORS_ORIGIN` | Yes | Allowed frontend URL |
| `SMTP_HOST` | No | Email server host |
| `SMTP_PORT` | No | Email server port |
| `SMTP_USER` | No | Email account |
| `SMTP_PASS` | No | Email app password |
| `SMTP_FROM` | No | Sender email address |
| `OWNER_EMAIL` | No | Shop owner's email for notifications |
| `WHATSAPP_PHONE` | No | WhatsApp number for order links |

## API Endpoints

See the full [API Reference](../docs/API_REFERENCE.md) for detailed request/response examples.

### Public (No Login Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/products` | List products (with filtering/pagination) |
| GET | `/api/products/search?q=` | Search products |
| GET | `/api/products/:id` | Get one product |
| GET | `/api/categories` | List categories |
| GET | `/api/categories/:slug` | Get category with products |
| GET | `/api/occasions` | List occasions |
| GET | `/api/occasions/:slug` | Get occasion with products |
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in |
| POST | `/api/contact` | Send contact message |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |

### Authenticated (Login Required)

Include `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/me` | Get my profile |
| PATCH | `/api/auth/profile` | Update my profile |
| PATCH | `/api/auth/password` | Change my password |
| GET | `/api/cart` | Get my cart |
| POST | `/api/cart/items` | Add to cart |
| PATCH | `/api/cart/items/:id` | Update cart item |
| DELETE | `/api/cart/items/:id` | Remove from cart |
| DELETE | `/api/cart` | Clear cart |
| GET | `/api/wishlist` | Get my wishlist |
| GET | `/api/wishlist/check/:productId` | Check if in wishlist |
| POST | `/api/wishlist/items` | Add to wishlist |
| DELETE | `/api/wishlist/items/:productId` | Remove from wishlist |
| GET | `/api/orders` | Get my orders |
| GET | `/api/orders/:id` | Get order details |
| GET | `/api/orders/:id/receipt` | Get order receipt |
| POST | `/api/orders` | Place order |
| PATCH | `/api/orders/:id` | Cancel order |

## Database

Uses **MySQL** with 12 tables. Tables are auto-created on first server start via `src/database/init.ts`.

See the full [Database Guide](../docs/DATABASE_GUIDE.md) for table details.

| Table | Purpose |
|-------|---------|
| `users` | User accounts |
| `categories` | Product categories |
| `occasions` | Special occasions |
| `products` | Product catalog |
| `product_gallery` | Product images |
| `product_sizes` | Size variants with prices |
| `cart_items` | Shopping cart |
| `wishlist_items` | Saved favorites |
| `orders` | Placed orders |
| `order_items` | Items in each order |
| `contact_messages` | Contact form submissions |
| `newsletter_subscribers` | Email subscribers |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with auto-reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run seed` | Seed database with sample data |
| `npm run typecheck` | Type-check without building |

## Project Structure

```
backend/
|-- src/
|   |-- database/init.ts     -- MySQL connection + table creation
|   |-- middleware/           -- Auth, error handling
|   |-- routes/              -- API route handlers
|   |-- scripts/seed.ts      -- Database seeder
|   |-- utils/               -- JWT, password, validation, email, shipping
|   |-- index.ts             -- Entry point
|-- .env.example             -- Environment variable template
|-- package.json             -- Dependencies and scripts
|-- tsconfig.json            -- TypeScript config
```

## License

MIT
