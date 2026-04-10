# Database Guide

> Think of the database like a **giant filing cabinet** in a school office. Every student, every grade, every class schedule is written on paper and stored in different drawers. The database does the same thing, but on a computer!

## What Is a Database?

A database is a place where the website stores ALL its information. Without it, the website would forget everything every time you refresh the page! No products, no users, no orders -- nothing.

**Wardity uses MySQL**, which is one of the most popular databases in the world. It's been around since 1995 and is used by websites like Facebook, YouTube, and Twitter.

## What Is a "Table"?

A database table is like a **spreadsheet** (like Excel or Google Sheets). It has columns (the headers) and rows (the data).

For example, the `users` table looks something like this:

| id | name | email | password_hash | phone | created_at |
|----|------|-------|--------------|-------|------------|
| 1 | Ahmed | ahmed@email.com | $2b$10$xyz... | +20111111 | 2026-01-15 |
| 2 | Sara | sara@email.com | $2b$10$abc... | +20222222 | 2026-02-20 |

Each **row** is one user. Each **column** is a piece of information about that user.

## All the Tables in Wardity

Wardity has **12 tables**. Here's what each one stores:

### 1. `users` -- The People

Stores everyone who created an account on the website.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | A unique number for each user | `1` |
| `email` | Their email address | `ahmed@email.com` |
| `name` | Their full name | `Ahmed Mohamed` |
| `password_hash` | Their password, scrambled for safety | `$2b$10$xyz...` (you can't read this!) |
| `phone` | Phone number (optional) | `+201115239553` |
| `created_at` | When they signed up | `2026-04-10 15:30:00` |
| `updated_at` | When they last changed their info | `2026-04-10 16:00:00` |

**Why is the password scrambled?** Imagine you wrote your diary in a secret code that nobody else can read. Even if someone steals the diary, they can't understand it! That's what "hashing" does to passwords.

### 2. `categories` -- The Product Groups

Groups products into types (like sections in a store).

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `name` | Category name | `Flowers` |
| `slug` | URL-friendly name | `flowers` |
| `image_type` | Type of category image | `emoji` |
| `bg_color` | Background color for the card | `#FFE4E1` |

**What's a slug?** It's a URL-friendly version of the name. Instead of `/categories/Red Flowers & More`, the slug makes it `/categories/red-flowers-more`. Cleaner!

### 3. `occasions` -- The Special Events

Lists the events people buy gifts for.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `name` | Occasion name | `Happy Birthday` |
| `slug` | URL-friendly name | `happy-birthday` |
| `image_type` | Type of occasion image | `emoji` |

### 4. `products` -- The Things for Sale

The main table! Every flower, cake, chocolate, and gift is stored here.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `name` | Product name | `Red Rose Bouquet` |
| `slug` | URL-friendly name | `red-rose-bouquet` |
| `description` | What the product is | `A beautiful bouquet of 12 red roses...` |
| `price` | Base price | `299.99` |
| `original_price` | Price before any discount | `349.99` |
| `image` | Main product image URL | `/images/red-roses.jpg` |
| `category_id` | Which category it belongs to | `1` (Flowers) |
| `occasion_id` | Which occasion it fits | `2` (I Love You) |
| `in_stock` | Is it available? | `1` (yes) or `0` (no) |
| `featured` | Should it show on the home page? | `1` (yes) or `0` (no) |
| `best_seller` | Is it a top seller? | `1` (yes) or `0` (no) |
| `rating` | Average customer rating | `4.8` |
| `review_count` | How many people reviewed it | `125` |

### 5. `product_gallery` -- Product Photos

Extra photos for each product (for the image carousel on the product page).

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `product_id` | Which product this photo belongs to | `1` (Red Rose Bouquet) |
| `main_image` | The main big image URL | `/images/roses-main.jpg` |
| `thumbnails` | Small preview images (stored as JSON) | `["/img/roses-1.jpg", "/img/roses-2.jpg"]` |

### 6. `product_sizes` -- Product Size Options

Some products come in different sizes with different prices.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `product_id` | Which product | `1` (Red Rose Bouquet) |
| `name` | Size name | `Large (24 Roses)` |
| `price` | Price for this size | `499.99` |

### 7. `cart_items` -- Shopping Cart

What each user has in their shopping cart right now.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `user_id` | Whose cart is this? | `1` (Ahmed) |
| `product_id` | What product? | `1` (Red Rose Bouquet) |
| `quantity` | How many? | `2` |
| `selected_size` | Which size did they pick? | `Large (24 Roses)` |
| `created_at` | When did they add it? | `2026-04-10 15:30:00` |

### 8. `wishlist_items` -- Saved Favorites

Items users saved to look at later (like bookmarks).

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `user_id` | Whose wishlist? | `1` (Ahmed) |
| `product_id` | What product? | `3` (Chocolate Cake) |
| `created_at` | When did they save it? | `2026-04-10 16:00:00` |

### 9. `orders` -- Placed Orders

Every order that has been placed on the website.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `user_id` | Who placed the order? | `1` (Ahmed) |
| `receipt_number` | Special tracking number | `WRD-000001` |
| `status` | Current status | `pending`, `confirmed`, `delivered`, `cancelled` |
| `subtotal` | Price before shipping | `599.98` |
| `shipping_cost` | Delivery fee | `50.00` |
| `total` | Final total | `649.98` |
| `customer_name` | Name on the order | `Ahmed Mohamed` |
| `customer_email` | Email for confirmation | `ahmed@email.com` |
| `customer_phone` | Phone for delivery | `+201115239553` |
| `shipping_address` | Delivery address | `123 Nile Street, Cairo` |
| `shipping_city` | City | `Cairo` |
| `shipping_area` | Area/neighborhood | `Maadi` |
| `delivery_date` | When to deliver | `2026-04-15` |
| `delivery_time` | Preferred time slot | `Morning (9am-12pm)` |
| `payment_method` | How they're paying | `cash_on_delivery` or `credit_card` |
| `payment_details` | Extra payment info (JSON) | `{"card_last4": "4242"}` |
| `notes` | Special instructions | `Please ring the doorbell twice` |
| `created_at` | When the order was placed | `2026-04-10 15:30:00` |

### 10. `order_items` -- Items in Each Order

What products are in each order (one order can have many items).

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `order_id` | Which order? | `1` (WRD-000001) |
| `product_id` | Which product? | `1` (Red Rose Bouquet) |
| `product_name` | Product name (saved in case product changes later) | `Red Rose Bouquet` |
| `product_image` | Product image at time of order | `/images/red-roses.jpg` |
| `quantity` | How many? | `2` |
| `size` | Which size? | `Large (24 Roses)` |
| `unit_price` | Price per item | `299.99` |
| `total_price` | Quantity x unit_price | `599.98` |

### 11. `contact_messages` -- Contact Form Messages

Messages people send through the Contact Us page.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `name` | Sender's name | `Sara Ali` |
| `email` | Sender's email | `sara@email.com` |
| `subject` | Message subject | `Question about delivery` |
| `message` | The full message | `Hi, do you deliver to Alexandria?` |
| `created_at` | When it was sent | `2026-04-10 16:00:00` |

### 12. `newsletter_subscribers` -- Email Subscribers

People who signed up to receive news and deals by email.

| Column | What It Stores | Example |
|--------|---------------|---------|
| `id` | Unique number | `1` |
| `email` | Their email address | `fan@email.com` |
| `created_at` | When they subscribed | `2026-04-10 12:00:00` |

## How Tables Are Connected

Tables are connected by **IDs**. Think of it like name tags:

```
Category (id: 1, name: "Flowers")
    |
    |-- Product (id: 1, name: "Red Rose Bouquet", category_id: 1)
    |-- Product (id: 2, name: "Sunflower Bunch", category_id: 1)
    |-- Product (id: 3, name: "Lily Arrangement", category_id: 1)

User (id: 1, name: "Ahmed")
    |
    |-- Cart Item (user_id: 1, product_id: 1, quantity: 2)
    |-- Wishlist Item (user_id: 1, product_id: 3)
    |-- Order (user_id: 1, receipt: "WRD-000001")
         |
         |-- Order Item (order_id: 1, product_id: 1, quantity: 2)
```

The `category_id: 1` in a product is like saying "this product belongs to Category #1 (Flowers)." This is called a **foreign key** -- it's a reference to another table.

## Database Indexes

Think of indexes like the **table of contents** in a book. Without it, you'd have to read every page to find what you want. With it, you jump straight to the right page!

Wardity has indexes on:
- `products.category_id` -- Quickly find all products in a category
- `products.occasion_id` -- Quickly find all products for an occasion
- `products.slug` -- Quickly find a product by its URL name
- `cart_items.user_id` -- Quickly find a user's cart
- `wishlist_items.user_id` -- Quickly find a user's wishlist
- `orders.user_id` -- Quickly find a user's orders
- `orders.receipt_number` -- Quickly find an order by receipt number

## How to Reset the Database

If things get messy and you want to start completely fresh:

```bash
cd backend
npm run seed
```

This will **delete everything** in the database and fill it with fresh sample data. All user accounts, orders, and cart items will be gone -- replaced with the default test data.

## How to Look at the Database Directly

If you want to peek inside the database (like opening the filing cabinet):

### Using XAMPP phpMyAdmin

1. Open XAMPP Control Panel
2. Click **Start** next to both **Apache** and **MySQL**
3. Click **Admin** next to MySQL (or go to http://localhost/phpmyadmin)
4. Click on `wardity` database on the left
5. You can see all tables, click any to see the data!

### Using the Terminal

```bash
mysql -u root -p wardity
```

Then type SQL commands:

```sql
-- See all products
SELECT * FROM products;

-- See all users
SELECT id, name, email FROM users;

-- See all orders
SELECT receipt_number, status, total FROM orders;

-- Count how many products we have
SELECT COUNT(*) FROM products;

-- Exit
EXIT;
```
